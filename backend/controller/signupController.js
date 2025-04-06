import ErrorHandler from "../error/error.js";
import User from "../model/userSchema.js";

// Email Validation Function
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const signup = async (req, res, next) => {
  try {
    const { name, email, phoneno, gender, password, role = "user" } = req.body;

    // Validate required fields
    if (!name || !email || !phoneno || !gender || !password) {
      return next(new ErrorHandler("⚠️ All fields are required.", 400));
    }

    // Check if email format is valid
    if (!isValidEmail(email)) {
      return next(
        new ErrorHandler("⚠️ Please enter a valid email address.", 400)
      );
    }

    // Check if phone number is valid (10 digits)
    if (!/^[0-9]{10}$/.test(phoneno)) {
      return next(
        new ErrorHandler("⚠️ Phone number must be exactly 10 digits.", 400)
      );
    }

    // Check if user with same email or phone already exists
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phoneno });

    if (existingUserByEmail) {
      return next(new ErrorHandler("⚠️ Email already registered.", 400));
    }

    if (existingUserByPhone) {
      return next(new ErrorHandler("⚠️ Phone number already registered.", 400));
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      phoneno,
      gender,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "✅ User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    // Handle duplicate key error (in case unique constraint fails)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message =
        field === "email"
          ? "⚠️ Email already registered."
          : "⚠️ Phone number already registered.";
      return next(new ErrorHandler(message, 400));
    }

    console.error(error);
    return next(
      new ErrorHandler("⚠️ Server error, please try again later.", 500)
    );
  }
};

export default signup;
