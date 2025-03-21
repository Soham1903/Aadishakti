import express from "express";
import multer from "multer";
import { addCourse, getCourses, getCourseByTitle } from "../controller/courseController.js";

const router = express.Router();

// Configure Multer for memory storage (store image as buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Course routes
router.post("/add", upload.single("image"), addCourse);
router.get("/get", getCourses);
router.get("/:title", getCourseByTitle);

export default router;
