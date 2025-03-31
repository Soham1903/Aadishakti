import Transaction from "../model/transactionSchema.js";
import User from "../model/userSchema.js";
import { v4 as uuidv4 } from "uuid";

export const createTransaction = async (req, res) => {
  try {
    const { customerName, phoneNumber, courseTitle } = req.body;

    if (!customerName || !phoneNumber || !courseTitle || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Process the uploaded screenshot file
    const screenshot = req.file
      ? {
          filename: req.file.originalname, // Store original filename
          contentType: req.file.mimetype, // Store MIME type
          imageBase64: req.file.buffer.toString("base64"), // Convert image to Base64
        }
      : null;

    // Generate a unique transaction ID
    const transactionId = uuidv4();

    // Create the new transaction
    const newTransaction = new Transaction({
      customerName,
      phoneNumber,
      courseTitle,
      screenshot, // Now stored in the same format as your image
      transactionId,
    });

    // Save the transaction to the database
    await newTransaction.save();

    const user = await User.findOne({ phoneno: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the purchased course to user's courses array
    user.courses.push({
      title: courseTitle,
      transactionId,
      screenshot, // Store the payment proof with the course
    });

    await user.save();

    // Respond with the newly created transaction data
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
