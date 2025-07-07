// testEmail.js - Run this to test your email configuration
import dotenv from "dotenv";
import {
  testEmailConnection,
  transporter,
  transporterExplicit,
} from "./emailConfig.js";

// Load environment variables
dotenv.config();

const testEmailSetup = async () => {
  console.log("=== Email Configuration Test ===\n");

  // 1. Check environment variables
  console.log("1. Checking environment variables...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ MISSING");
  console.log(
    "EMAIL_PASSWORD:",
    process.env.EMAIL_PASSWORD ? "✅ PRESENT" : "❌ MISSING"
  );
  console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL || "❌ MISSING");

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("\n❌ Missing required environment variables!");
    console.log("Make sure your .env file contains:");
    console.log("EMAIL_USER=your-email@gmail.com");
    console.log("EMAIL_PASSWORD=your-app-password");
    return;
  }

  console.log("\n2. Testing email connection...");
  const connectionResult = await testEmailConnection();

  if (!connectionResult) {
    console.error("\n❌ Email connection failed!");
    console.log("Please check:");
    console.log("1. Your Gmail app password is correct");
    console.log("2. 2FA is enabled on your Gmail account");
    console.log(
      "3. The app password has the correct format (16 characters with spaces)"
    );
    return;
  }

  console.log("\n3. Sending test email...");
  try {
    const testEmailData = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email - Configuration Working",
      html: "<h2>Email Configuration Test</h2><p>If you receive this email, your configuration is working correctly!</p>",
    };

    await transporter.sendMail(testEmailData);
    console.log("✅ Test email sent successfully!");
    console.log("Check your inbox at:", process.env.ADMIN_EMAIL);
  } catch (error) {
    console.error("❌ Test email failed:", error.message);

    // Try explicit configuration
    try {
      console.log("Trying explicit Gmail configuration...");
      await transporterExplicit.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "Test Email - Explicit Config Working",
        html: "<h2>Email Configuration Test (Explicit)</h2><p>This email was sent using explicit Gmail configuration!</p>",
      });
      console.log("✅ Test email sent successfully with explicit config!");
    } catch (explicitError) {
      console.error("❌ Explicit config also failed:", explicitError.message);
    }
  }
};

// Run the test
testEmailSetup().catch(console.error);
