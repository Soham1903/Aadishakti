import { useState } from "react";

function CourseForm() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
    alert("Course Submitted!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Title */}
        <div>
          <label className="block text-gray-700 font-medium">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            placeholder="Enter course title"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            placeholder="Enter course description"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">
            Course Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            placeholder="Enter course price"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-medium">
            Duration (hrs)
          </label>
          <input
            type="text"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            placeholder="Enter course duration"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Buy Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
