import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "../model/userSchema.js";

dotenv.config();

// Forgot Password: Sends an email with the reset token
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Token valid for 15 minutes
    });

    const resetLink = `https://www.adishaktigurukul.com/reset-password/${resetToken}`;

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Email Service - Environment Variables:");
    console.log("EMAIL_USER:", process.env.EMAIL_USER || "MISSING");
    console.log(
      "EMAIL_PASSWORD:",
      process.env.EMAIL_PASS ? "PRESENT" : "MISSING"
    );
    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL || "MISSING");

    // Send Reset Password email
    await transporter.sendMail({
      from: '"Support Team" <support@example.com>',
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password: Handles password update using the token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verify if password is provided
    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
