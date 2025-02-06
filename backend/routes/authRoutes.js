// routes/authRoutes.js
import express from "express";
import signup from "../controller/signupController.js";
import login from "../controller/LoginController.js";
import { forgotPassword, resetPassword } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
