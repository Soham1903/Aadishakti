// services/emailService.js
import nodemailer from "nodemailer";

// Email configuration
const emailConfig = {
  service: "gmail", // or your email provider
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASSWORD, // your app password
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Email templates
const createAdminNotificationEmail = (transaction, courseDetails) => {
  const courseList = courseDetails
    .map((course) => `- ${course.courseTitle} (₹${course.price})`)
    .join("\n");

  return {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Admin email
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
    to: transaction.user.email, // Customer email
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
    const emailData = createAdminNotificationEmail(transaction, courseDetails);
    await transporter.sendMail(emailData);
    console.log("Admin notification email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error: error.message };
  }
};

export const sendCustomerConfirmation = async (transaction, courseDetails) => {
  try {
    const emailData = createCustomerConfirmationEmail(
      transaction,
      courseDetails
    );
    await transporter.sendMail(emailData);
    console.log("Customer confirmation email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending customer confirmation:", error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Email service is ready");
    return true;
  } catch (error) {
    console.error("Email service error:", error);
    return false;
  }
};
