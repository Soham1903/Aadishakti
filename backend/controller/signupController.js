import ErrorHandler from "../error/error.js";
import User from "../model/userSchema.js";

const signup = async (req, res, next) => {
  try {
    const { name, email, phoneno, gender, password, role = "user" } = req.body;

    // Validate required fields
    const requiredFields = { name, email, phoneno, gender, password };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return next(
        new ErrorHandler(
          `Missing required fields: ${missingFields.join(", ")}`,
          400
        )
      );
    }

    // Validate email format
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return next(new ErrorHandler("Please enter a valid email address", 400));
    }

    // Validate phone number format
    if (!/^[0-9]{10}$/.test(phoneno)) {
      return next(
        new ErrorHandler("Phone number must be exactly 10 digits", 400)
      );
    }

    // Validate password length
    if (password.length < 8) {
      return next(
        new ErrorHandler("Password must be at least 8 characters", 400)
      );
    }

    // Check for existing users
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phoneno });

    if (existingUserByEmail && existingUserByPhone) {
      return next(
        new ErrorHandler("Email and phone number already registered", 400)
      );
    }
    if (existingUserByEmail) {
      return next(new ErrorHandler("Email already registered", 400));
    }
    if (existingUserByPhone) {
      return next(new ErrorHandler("Phone number already registered", 400));
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

    // Omit password from response
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    // Handle duplicate key error (in case unique constraint fails)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message =
        field === "email"
          ? "Email already registered"
          : "Phone number already registered";
      return next(new ErrorHandler(message, 400));
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(messages.join(", "), 400));
    }

    console.error("Signup error:", error);
    return next(new ErrorHandler("Server error, please try again later", 500));
  }
};

export default signup;
