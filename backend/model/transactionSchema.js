import mongoose from "mongoose";
import User from "./userSchema.js";
import Course from "./courseSchema.js";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // For single course transactions - keep for backward compatibility
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false, // Make optional since we might have multiple courses
  },
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
  },
  transactionId: {
    type: String,
    required: [true, "Transaction ID is required"],
    unique: true,
  },
  // For single course - keep for backward compatibility
  courseId: {
    type: String,
    required: false, // Make optional since we might have multiple courses
    // Remove unique constraint as we'll have courseIds array
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
  },
  courseTitle: {
    type: [String],
    required: [true, "Course title is required"],
  },
  promoCode: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  paymentProof: {
    filename: String,
    contentType: String,
    imageBase64: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Main courses array - this is the primary way to store course data
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      courseTitle: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  // Array of course ObjectIds for easy querying
  courseIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ phoneNumber: 1 });
transactionSchema.index({ courseIds: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
