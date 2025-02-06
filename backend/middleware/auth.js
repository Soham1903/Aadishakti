// middleware/auth.js
import jwt from "jsonwebtoken";
import { User } from "../model/userSchema.js";
import ErrorHandler from "../error/error.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  } catch (error) {
    next(error);
  }
};
