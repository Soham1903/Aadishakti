import Course from "../model/courseSchema.js";
import User from "../model/userSchema.js";
import mongoose from "mongoose";

// Add Course
export const addCourse = async (req, res) => {
  try {
    console.log("1. Multer file object:", req.file); // Should show Cloudinary info
    console.log("2. Request body:", req.body);
    // Validate required fields
    const requiredFields = ["title", "description", "price"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Validate image exists
    if (!req.file) {
      return res.status(400).json({ error: "Course image is required" });
    }

    const {
      title,
      description,
      price,
      duration,
      syllabus,
      instructor,
      timing,
      benefits,
    } = req.body;

    const newCourse = new Course({
      title,
      description,
      price: Number(price), // Ensure numeric type
      duration,
      syllabus,
      instructor,
      timing,
      benefits,
      image: req.file.secure_url || req.file.path, // Works with both Cloudinary and local
    });

    await newCourse.save();

    res.status(201).json({
      message: "Course added successfully!",
      course: {
        id: newCourse._id,
        title: newCourse.title,
        image: newCourse.image,
        // Include other fields you want to return
      },
    });
  } catch (error) {
    console.error("Error adding course:", error);

    // More specific error handling
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Course by Title
export const getCourseByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const course = await Course.findOne({ title });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getCourseById = async (req, res) => {};

// controllers/courseController.js
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update fields
    course.title = req.body.title || course.title;
    course.instructor = req.body.instructor || course.instructor;
    course.description = req.body.description || course.description;
    course.syllabus = req.body.syllabus || course.syllabus;
    course.price = req.body.price || course.price;
    course.duration = req.body.duration || course.duration;
    course.timing = req.body.timing || course.timing;

    // Handle image update if needed
    if (req.file) {
      course.image = {
        contentType: req.file.mimetype,
        imageBase64: req.file.buffer.toString("base64"),
      };
    }

    // Save the updated course
    const updatedCourse = await course.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Course by ID
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully!" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/userController.js
export const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Getting courses for user:", userId);

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const user = await User.findById(userId).populate({
      path: "courses",
      select:
        "title description price duration instructor image createdAt isActive",
      // Optional: Only populate active courses
      match: { isActive: { $ne: false } },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Filter out any null courses (in case some courses were deleted)
    const activeCourses = user.courses.filter((course) => course !== null);

    res.status(200).json({
      success: true,
      message: `Found ${activeCourses.length} courses`,
      data: {
        userId: user._id,
        userName: user.name, // Include user name if available
        courses: activeCourses,
        totalCourses: activeCourses.length,
      },
    });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching courses",
      error: error.message,
    });
  }
};
