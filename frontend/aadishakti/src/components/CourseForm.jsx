import { useState } from "react";

function CourseForm() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    duration: "",
    instructor: "",
    timing: "",
    benefits: "",
    syllabus: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Create a FormData object to send files
      const formData = new FormData();

      // Add all text fields
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("price", course.price);
      formData.append("duration", course.duration);
      formData.append("instructor", course.instructor);
      formData.append("timing", course.timing);
      formData.append("benefits", course.benefits);
      formData.append("syllabus", course.syllabus);

      // Add the image file
      if (course.image) {
        formData.append("image", course.image);
      }

      // Send the data to your backend API
      // Replace with your actual backend URL
      const response = await fetch("http://localhost:4000/api/courses/add", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header when sending FormData
        // The browser will set it automatically with the correct boundary
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Course submitted successfully!");
        console.log("Response from server:", data);

        // Reset form
        setCourse({
          title: "",
          description: "",
          image: null,
          price: "",
          duration: "",
          instructor: "",
          timing: "",
          benefits: "",
          syllabus: "",
        });

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        setSubmitMessage(`Error: ${data.error || "Failed to submit course"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("Failed to submit course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Course</h2>

      {submitMessage && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            submitMessage.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {submitMessage}
        </div>
      )}

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
            name="image"
            onChange={handleFileChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Instructor */}
        <div>
          <label className="block text-gray-700 font-medium">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            placeholder="Enter instructor name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Timing */}
        <div>
          <label className="block text-gray-700 font-medium">Timing</label>
          <input
            type="time"
            name="timing"
            value={course.timing}
            onChange={handleChange}
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
            Duration (months)
          </label>
          <input
            type="number"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            placeholder="Enter course duration"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-gray-700 font-medium">Benefits</label>
          <textarea
            name="benefits"
            value={course.benefits}
            onChange={handleChange}
            placeholder="Enter benefits of the course"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Syllabus */}
        <div>
          <label className="block text-gray-700 font-medium">Syllabus</label>
          <textarea
            name="syllabus"
            value={course.syllabus}
            onChange={handleChange}
            placeholder="Enter syllabus details"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded-lg transition`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
