import React from "react";
import coursesData from "../data/courses.json";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CourseLinks() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Find the course that matches the id from params
  const course = Array.isArray(coursesData)
    ? coursesData.find((course) => course.courseId === courseId)
    : coursesData.courseId === courseId
    ? coursesData
    : null;

  // If course not found, show error
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-10">
      <div className="max-w-md mx-auto">
        {/* Course Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          {course.title}
        </h1>

        {/* Video Links */}
        <div className="space-y-3 mb-8">
          {course.links && course.links.length > 0 ? (
            course.links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-red-800 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
              >
                <span className="text-stone-50 font-medium">
                  Video {index + 1}
                </span>
              </a>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">
              No videos available
            </p>
          )}
        </div>

        {/* Certificate Button */}
        <button
          onClick={() => navigate(`/courses/${course.courseId}/certificate`)}
          className="w-full p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
        >
          View Certificate
        </button>
      </div>
    </div>
  );
}

export default CourseLinks;
