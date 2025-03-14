import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

const CourseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    default: () => uuidv4().split("-")[0],
    unique: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    data: Buffer, // Store image as binary data
    contentType: String, // Store the MIME type of the image
  },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  syllabus: { type: String, required: true },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
