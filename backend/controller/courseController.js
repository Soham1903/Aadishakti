import Course from "../model/CourseSchema.js";

// Add Course
export const addCourse = async (req, res) => {
  try {
    const { title, description, price, duration, syllabus } = req.body;
    const image = req.file
      ? {
          data: req.file.buffer.toString("base64"),
          contentType: req.file.mimetype,
        }
      : null;

    const newCourse = new Course({
      title,
      description,
      price,
      duration,
      syllabus,
      image,
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
