import ErrorHandler from "../error/error.js";
import { User } from "../model/userSchema.js";

const signup = async (req, res, next) => {
  const { name, email, password, gender, phoneno } = req.body;
  console.log(req.body)
  if (!name || !email || !password || !gender || !phoneno) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  try {
    await User.create({ name, email, password, gender, phoneno });
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
  }
};

export default signup;
