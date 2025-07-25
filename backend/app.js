import { v2 as cloudinary } from "cloudinary";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import signupRoute from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import promocodeRoutes from "./routes/promocodeRoutes.js";
import transactionRoutes from "./routes/transactionRoute.js";
import axios from "axios";
const app = express();
import multer from "multer";
import path from "path";

dotenv.config({ path: "./config/.env" });

app.use(
  cors({
    // origin: ["https://aadishakti-frontend.onrender.com"],
    origin: [
      "https://aadishakti-frontend.onrender.com",
      "http://localhost:5173", //
      "https://www.adishaktigurukul.com",
      "https://aadishakti-backend-ue51.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", signupRoute); // Auth Routes
app.use("/api/images", imageRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/promocode", promocodeRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/uploads", express.static(path.join("public", "uploads")));

dbConnection();
export default app;
