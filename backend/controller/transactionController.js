import Transaction from "../model/transactionSchema.js";
import User from "../model/userSchema.js";
import Course from "../model/courseSchema.js";
import PromoCode from "../model/promocodeSchema.js";
import { v4 as uuidv4 } from "uuid";

// controllers/transactionController.js
// controllers/transactionController.js
export const createTransaction = async (req, res) => {
  try {
    const { customerName, phoneNumber, courseTitle, promoCode, finalPrice } =
      req.body;

    console.log(req.body.courseTitle);

    console.log("Received transaction data:");
    console.log("Customer:", courseTitle);
    console.log("Phone:", phoneNumber);
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

    // 1. Find the course
    // const course = await Course.findOne({ title: courseTitle });
    // const user = await User.findOne({ phoneno: phoneNumber });
    // if (!course) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Course not found",
    //   });
    // }

    // 2. Initialize price variables
    let originalPrice = finalPrice || 0;
    let discountApplied = 0;
    let validPromoCode = null;

    // 3. Validate and apply promo code if provided

    // 4. Process payment proof
    const paymentProof = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString("base64"),
    };

    // 6. Find and update user
    const user = await User.findOne({ phoneno: phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Create transaction record
    const newTransaction = new Transaction({
      customerName,
      phoneNumber,
      courseTitle,
      paymentProof,
      transactionId: uuidv4(),
      promoCode: promoCode,
      originalPrice,
      finalPrice,
      discountApplied,
      transactionDate: new Date(),
      user: user._id,
    });
    // 7. Save everything
    await Promise.all([newTransaction.save(), user.save()]);

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

// controllers/transactionController.js

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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

    // 1. Find transaction with user and course populated
    const transaction = await Transaction.findById(transactionId)
      .populate("user", "courses")
      .populate("course");

    console.log("Fetched transaction:", transaction);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 2. Update verification status
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        isVerified,
        verifiedAt: isVerified ? new Date() : null,
      },
      { new: true }
    );

    console.log("Updated transaction:", updatedTransaction);

    // 3. If verified, update user's courses and promo code
    if (isVerified && transaction.course && transaction.user) {
      const user = await User.findById(transaction.user._id);
      console.log("Fetched user before course update:", user);

      // Check if course already exists in user's courses
      const courseExists = user.courses.some(
        (courseId) => courseId.toString() === transaction.course._id.toString()
      );

      console.log("Course exists in user already:", courseExists);
      console.log("Transaction course ID:", transaction.course._id);

      if (!courseExists) {
        user.courses.push(transaction.course._id);
        await user.save();
        console.log("Course added to user. Updated user:", user);
      } else {
        console.log("Course already exists in user's courses. Skipping push.");
      }

      if (transaction.promoCode) {
        const updatedPromo = await PromoCode.findOneAndUpdate(
          { code: transaction.promoCode },
          { $inc: { totalRedemptions: 1 } },
          { new: true }
        );
        console.log("Promo code updated:", updatedPromo);
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
