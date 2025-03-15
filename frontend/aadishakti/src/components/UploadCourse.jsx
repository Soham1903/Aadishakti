import { useState } from "react";
import axios from "axios";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    image: "",
    price: "",
    duration: "",
    syllabus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: { data: reader.result, contentType: file.type },
        });
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/courses/add",
        formData, // No need for FormData since image is stored as Base64
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Course added successfully!");
      console.log("Response:", response.data);
      setFormData({
        courseName: "",
        description: "",
        image: "",
        price: "",
        duration: "",
        syllabus: "",
      });
    } catch (error) {
      alert(
        "Error adding course: " + error.response?.data?.message || error.message
      );
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>

      <label className="block mb-2">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Upload Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
          className="w-full p-2"
        />
      </label>

      <label className="block mb-2">
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Duration:
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Syllabus:
        <textarea
          name="syllabus"
          value={formData.syllabus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
      </label>

      <button
        type="submit"
        className="w-full bg-[#C75B7A] text-white px-4 py-2 rounded"
      >
        Add Course
      </button>
    </form>
  );
};

export default CourseForm;
