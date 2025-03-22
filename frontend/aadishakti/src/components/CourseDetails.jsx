import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseDetails() {
  const { title } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch course details by title
    fetch(`http://localhost:4000/api/courses/${title}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCourse(data);
        } else {
          setError("Course not found.");
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <img
        src={`data:${course.image.contentType};base64,${course.image.imageBase64}`}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="text-lg font-semibold">Duration: {course.duration} hrs</p>
      <p className="text-xl font-bold text-blue-600">Price: ${course.price}</p>
      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        Enroll Now
      </button>
    </div>
  );
}
