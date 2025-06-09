export const createTransaction = async (req, res) => {
  try {
    const { customerName, phoneNumber, courseTitle, promoCode, finalPrice } =
      req.body;

    console.log("Received transaction data:");
    console.log("Customer:", customerName); // Fixed: was courseTitle
    console.log("Phone:", phoneNumber);
    console.log("Course:", courseTitle);
    console.log("Promo Code:", promoCode);
    console.log("Final Price:", finalPrice);

    // Validate required fields
    if (
      !customerName ||
      !phoneNumber ||
      !courseTitle ||
      !finalPrice ||
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including screenshot are required",
      });
    }

    // 1. Find the course and validate it exists
    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 2. Find and validate user exists
    const user = await User.findOne({ phoneno: phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Initialize price variables
    let originalPrice = course.price || finalPrice; // Use course price as original
    let discountApplied = 0;
    let validPromoCode = null;

    // 4. Validate and apply promo code if provided
    if (promoCode) {
      const promo = await PromoCode.findOne({ code: promoCode });
      if (promo && promo.isActive) {
        validPromoCode = promo;
        discountApplied = (originalPrice * promo.discountPercentage) / 100;
        // Verify final price matches expected discounted price
        const expectedFinalPrice = originalPrice - discountApplied;
        if (Math.abs(finalPrice - expectedFinalPrice) > 0.01) {
          return res.status(400).json({
            success: false,
            message: "Price calculation mismatch",
          });
        }
      }
    }

    // 5. Process payment proof
    const paymentProof = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString("base64"),
    };

    // 6. Create transaction record
    const newTransaction = new Transaction({
      customerName,
      phoneNumber,
      courseTitle: [courseTitle], // Fixed: Make array if schema expects array
      // OR change schema to: courseTitle: { type: String, required: true }
      course: course._id, // Fixed: Reference the actual course
      paymentProof,
      transactionId: uuidv4(),
      promoCode: promoCode,
      originalPrice,
      finalPrice,
      discountApplied,
      transactionDate: new Date(),
      user: user._id,
    });

    // 7. Save transaction
    await newTransaction.save();

    // 8. Return success response
    res.status(201).json({
      success: true,
      message: `Course purchased ${
        validPromoCode ? "with discount" : "successfully"
      }`,
      transaction: {
        id: newTransaction._id,
        course: courseTitle,
        originalPrice,
        finalPrice,
        discountApplied,
        paymentProof,
        promoCode: promoCode,
      },
    });
  } catch (error) {
    console.error("Transaction error:", error);
    console.error("Transaction error:", error.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const toggleVerification = async (req, res) => {
  try {
    const { isVerified } = req.body;
    const transactionId = req.params.id;

    if (typeof isVerified !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isVerified must be a boolean value",
      });
    }

    // 1. Find transaction with populated course
    const transaction = await Transaction.findById(transactionId)
      .populate("user", "courses")
      .populate("course", "title"); // Fixed: populate course details

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 2. Update verification
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        isVerified,
        verifiedAt: isVerified ? new Date() : null,
      },
      { new: true }
    );

    // 3. If verified, update user and promocode
    if (isVerified && transaction.course && transaction.phoneNumber) {
      const user = await User.findOne({ phoneno: transaction.phoneNumber });

      if (user && !user.courses.includes(transaction.course._id)) {
        user.courses.push(transaction.course._id); // Fixed: Use course ObjectId
        await user.save();
      }

      // Update promo code usage
      if (transaction.promoCode) {
        await PromoCode.findOneAndUpdate(
          { code: transaction.promoCode },
          { $inc: { totalRedemptions: 1 } }
        );
      }
    }

    res.json({
      success: true,
      updatedTransaction,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
