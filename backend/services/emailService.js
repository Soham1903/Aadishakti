// services/emailService.js
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Ensure environment variables are loaded
dotenv.config();

// Debug logging (remove after fixing)
console.log("Email Service - Environment Variables:");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "MISSING");
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASS ? "PRESENT" : "MISSING");
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL || "MISSING");

// Create transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adishaktigurukul@gmail.com",
    pass: "zqze vcaj uusn rslm",
  },
});

// Test connection
export const testEmailConnection = async () => {
  try {
    // if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    //   throw new Error("Email credentials missing from environment variables");
    // }

    await transporter.verify();
    console.log("✅ Email connection successful");
    return true;
  } catch (error) {
    console.error("❌ Email connection failed:", error.message);
    return false;
  }
};

const createAdminNotificationEmail = (transaction, courseDetails) => {
  const courseList = courseDetails
    .map((course) => `- ${course.courseTitle} (₹${course.price})`)
    .join("\n");

  return {
    from: "adishaktigurukul@gmail.com",
    to: "adishaktigurukul@gmail.com",
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
          <a href="https://www.adishaktigurukul.com/transactiondashboard
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
    from: "adishaktigurukul@gmail.com",
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

export const sendAdminNotification = async (transaction, courseDetails) => {
  try {
    console.log("Sending admin notification...");

    const connectionTest = await testEmailConnection();
    if (!connectionTest) {
      throw new Error("Email connection test failed");
    }

    const emailData = createAdminNotificationEmail(transaction, courseDetails);
    await transporter.sendMail(emailData);
    console.log("✅ Admin notification sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Admin notification failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const sendCustomerConfirmation = async (transaction, courseDetails) => {
  try {
    console.log("Sending customer confirmation...");

    const connectionTest = await testEmailConnection();
    if (!connectionTest) {
      throw new Error("Email connection test failed");
    }

    const emailData = createCustomerConfirmationEmail(
      transaction,
      courseDetails
    );
    await transporter.sendMail(emailData);
    console.log("✅ Customer confirmation sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Customer confirmation failed:", error.message);
    return { success: false, error: error.message };
  }
};
