import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseDetails() {
  const { title } = useParams(); // Get title from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch course details by title
    fetch(`http://localhost:4000/api/courses/${title}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCourse(data);
        } else {
          setError(data.error || "Course not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch course details.");
        setLoading(false);
      });
  }, [title]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">{course.title}</h1>

      {course.image && (
        <img
          src={`data:${course.image.contentType};base64,${course.image.imageBase64}`}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      <p className="text-gray-700 mb-4 text-lg">{course.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>📚 Syllabus:</strong> {course.syllabus}
        </p>
        <p>
          <strong>👨‍🏫 Instructor:</strong> {course.instructor}
        </p>
        <p>
          <strong>⏰ Timing:</strong> {course.timing}
        </p>
        <p>
          <strong>🛍️ Benefits:</strong> {course.benefits}
        </p>
        <p>
          <strong>⌛ Duration:</strong> {course.duration} hours
        </p>
        <p>
          <strong>💰 Price:</strong> ${course.price}
        </p>
      </div>

      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        Enroll Now
      </button>
    </div>
  );
}
