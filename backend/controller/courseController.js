import Course from "../model/courseSchema.js";

// Create a new course
export const addCourse = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;
    const image = req.file ? req.file.path : "";

    const newCourse = new Course({
      title,
      description,
      image,
      price,
      duration,
    });
    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
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
