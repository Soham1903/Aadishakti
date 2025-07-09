// emailConfig.js - Complete email configuration with debugging
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Debug: Log environment variables (remove this after fixing)
// console.log("Debug - Email Environment Variables:");
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log(
//   "EMAIL_PASSWORD:",
//   process.env.EMAIL_PASS ? "***PRESENT***" : "***MISSING***"
// );
// console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

// Create transporter with explicit configuration
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Alternative: More explicit Gmail configuration
export const transporterExplicit = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test function to verify credentials
export const testEmailConnection = async () => {
  try {
    console.log("Testing email connection...");

    // Check if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Email credentials missing from environment variables");
    }

    await transporter.verify();
    console.log("✅ Email server connection successful");
    return true;
  } catch (error) {
    console.error("❌ Email server connection failed:", error.message);

    // Try explicit configuration
    try {
      console.log("Trying explicit Gmail configuration...");
      await transporterExplicit.verify();
      console.log("✅ Explicit Gmail configuration successful");
      return true;
    } catch (explicitError) {
      console.error(
        "❌ Explicit Gmail configuration also failed:",
        explicitError.message
      );
      return false;
    }
  }
};

// Email template functions
const createAdminNotificationEmail = (transaction, courseDetails) => {
  const courseList = courseDetails
    .map((course) => `- ${course.courseTitle} (₹${course.price})`)
    .join("\n");

  return {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Transaction Created - ${transaction.transactionId}`,
    html: `
      <h2>New Transaction Notification</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
        <h3>Transaction Details</h3>
        <p><strong>Transaction ID:</strong> ${transaction.transactionId}</p>
        <p><strong>Customer:</strong> ${transaction.customerName}</p>
        <p><strong>Phone:</strong> ${transaction.phoneNumber}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        
        <h3>Course Details</h3>
        <pre>${courseList}</pre>
        
        <h3>Payment Information</h3>
        <p><strong>Original Price:</strong> ₹${transaction.originalPrice}</p>
        ${
          transaction.promoCode
            ? `<p><strong>Promo Code:</strong> ${transaction.promoCode}</p>`
            : ""
        }
        <p><strong>Final Price:</strong> ₹${transaction.finalPrice}</p>
        
        <p><strong>Status:</strong> Pending Verification</p>
        
        <div style="margin-top: 20px;">
          <a href="${process.env.ADMIN_DASHBOARD_URL}/transactions/${
      transaction._id
    }" 
             style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Transaction
          </a>
        </div>
      </div>
    `,
  };
};

const createCustomerConfirmationEmail = (transaction, courseDetails) => {
  const courseList = courseDetails
    .map((course) => `- ${course.courseTitle}`)
    .join("\n");

  return {
    from: process.env.EMAIL_USER,
    to: transaction.user.email,
    subject: `Transaction Confirmation - ${transaction.transactionId}`,
    html: `
      <h2>Transaction Confirmation</h2>
      <p>Dear ${transaction.customerName},</p>
      
      <p>Thank you for your purchase! We have received your transaction and it's currently being processed.</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Transaction Details</h3>
        <p><strong>Transaction ID:</strong> ${transaction.transactionId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        
        <h3>Courses Purchased</h3>
        <pre>${courseList}</pre>
        
        <p><strong>Total Amount:</strong> ₹${transaction.finalPrice}</p>
        <p><strong>Status:</strong> Pending Verification</p>
      </div>
      
      <p>Your transaction is currently being verified. You will receive another email once the verification is complete and your courses are activated.</p>
      
      <p>If you have any questions, please contact our support team.</p>
      
      <p>Best regards,<br>Your Course Team</p>
    `,
  };
};

// Main email sending functions
export const sendAdminNotification = async (transaction, courseDetails) => {
  try {
    console.log("Attempting to send admin notification...");

    // Test connection first
    const connectionTest = await testEmailConnection();
    if (!connectionTest) {
      throw new Error("Email server connection failed");
    }

    const emailData = createAdminNotificationEmail(transaction, courseDetails);
    console.log("Email data prepared, sending...");

    // Try with regular transporter first
    try {
      await transporter.sendMail(emailData);
      console.log("✅ Admin notification email sent successfully");
      return { success: true };
    } catch (error) {
      console.log(
        "Regular transporter failed, trying explicit configuration..."
      );
      await transporterExplicit.sendMail(emailData);
      console.log(
        "✅ Admin notification email sent successfully (explicit config)"
      );
      return { success: true };
    }
  } catch (error) {
    console.error("❌ Error sending admin notification:", error.message);
    return { success: false, error: error.message };
  }
};

export const sendCustomerConfirmation = async (transaction, courseDetails) => {
  try {
    console.log("Attempting to send customer confirmation...");

    // Test connection first
    const connectionTest = await testEmailConnection();
    if (!connectionTest) {
      throw new Error("Email server connection failed");
    }

    const emailData = createCustomerConfirmationEmail(
      transaction,
      courseDetails
    );
    console.log("Customer email data prepared, sending...");

    // Try with regular transporter first
    try {
      await transporter.sendMail(emailData);
      console.log("✅ Customer confirmation email sent successfully");
      return { success: true };
    } catch (error) {
      console.log(
        "Regular transporter failed, trying explicit configuration..."
      );
      await transporterExplicit.sendMail(emailData);
      console.log(
        "✅ Customer confirmation email sent successfully (explicit config)"
      );
      return { success: true };
    }
  } catch (error) {
    console.error("❌ Error sending customer confirmation:", error.message);
    return { success: false, error: error.message };
  }
};

// Export default transporter for backward compatibility
export default transporter;
