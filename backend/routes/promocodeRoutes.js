import { createPromoCode, applyPromoCode } from "../controller/promocodeController.js";
import express from "express";

const router = express.Router();

router.post("/add", createPromoCode);
router.post("/apply", applyPromoCode);
export default router;
