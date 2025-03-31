import express from "express";
import multer from "multer";
import { createTransaction } from "../controller/transactionController.js";

const upload = multer();
const router = express.Router();

router.post("/create", upload.single("screenshot"), createTransaction);

export default router;
