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

    // Validate required fields
    if (!customerName || !phoneNumber || !courseTitle || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including screenshot are required",
      });
    }

    // 1. Find the course
    const course = await Course.findOne({ title: courseTitle });
    const user = await User.findOne({ phoneno: phoneNumber });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 2. Initialize price variables
    let originalPrice = course.price;
    let discountApplied = 0;
    let validPromoCode = null;

    // 3. Validate and apply promo code if provided

    // 4. Process payment proof
    const paymentProof = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString("base64"),
    };

    // 5. Create transaction record
    const newTransaction = new Transaction({
      customerName,
      phoneNumber,
      course: course._id,
      courseTitle,
      paymentProof,
      transactionId: uuidv4(),
      promoCode: promoCode,
      originalPrice,
      finalPrice,
      discountApplied,
      transactionDate: new Date(),
      user: user._id,
      course: course._id,
    });

    // 6. Find and update user
    // const user = await User.findOne({ phoneno: phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate("course", "title");
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

    // 1. Find transaction
    const transaction = await Transaction.findById(transactionId).populate(
      "user",
      "courses"
    ).po;
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
    console.log("isVerified:", isVerified);
    console.log("transaction.course:", transaction.course);
    console.log("transaction.user:", transaction.user);

    if (isVerified && transaction.course && transaction.phoneNumber) {
      const user = await User.findById(transaction.user._id);

      if (user && !user.courses.includes(transaction.course)) {
        user.courses.push(transaction.course);
        await user.save();
      }

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
