import Course from "../model/courseSchema.js";

// Create a new course
export const addCourse = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, description, price, duration, syllabus } = req.body;
    const image = req.file ? req.file.path : "";

    // Check if any required field is missing
    if (!title || !description || !price || !duration || !syllabus) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCourse = new Course({
      title,
      description,
      image,
      price,
      duration,
      syllabus,
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(courses);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};
