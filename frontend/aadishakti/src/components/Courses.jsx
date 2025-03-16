import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/courses/get") // Adjust URL if needed
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Available Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-gray-500 text-center">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Course Image */}
              <img
                src={`data:${course.image.contentType};base64,${course.image.imageBase64}`}
                alt={course.title}
                className="w-full h-48 object-cover"
              />

              {/* Course Info */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {course.title}
                </h3>
                <p className="text-gray-700 mt-2">{course.description}</p>

                {/* Price & Duration */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-600">
                    ${course.price}
                  </span>
                  <span className="text-gray-600">{course.duration} hrs</span>
                </div>

                {/* Buy Button */}
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
