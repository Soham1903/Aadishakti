import Course from "../model/CourseSchema.js";

// Add Course
export const addCourse = async (req, res) => {
  try {
    const { title, description, price, duration, syllabus } = req.body;

    const image = req.file
      ? {
          filename: req.file.originalname, // Store original filename
          contentType: req.file.mimetype, // Store MIME type
          imageBase64: req.file.buffer.toString("base64"), // Convert image to Base64
        }
      : null;

    console.log(req.body);

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
