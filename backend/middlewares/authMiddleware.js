import jwt from "jsonwebtoken";
import ErrorHandler from "../error/error.js"; // Assuming you have a custom error handler

const verifyToken = (req, res, next) => {
  // 1. Get token from headers or cookies
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Authorization token required",
    });
  }

  // 2. Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid/Expired token",
      });
    }

    // 3. Attach user to request
    req.user = user;
    next();
  });
};

export default verifyToken;
