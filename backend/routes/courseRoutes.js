import express from "express";
import multer from "multer";
import { addCourse, getCourses } from "../controller/courseController.js";

const router = express.Router();

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
const temp = 1;

// Course routes
router.post("/add", upload.single("image"), addCourse);
router.get("/", getCourses);

export default router;
