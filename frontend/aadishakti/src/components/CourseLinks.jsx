import React from "react";
import coursesData from "../data/courses.json";
import { useParams } from "react-router-dom";

function CourseLinks() {
  const { courseId } = useParams();

  // Find the course that matches the id from params
  const course = Array.isArray(coursesData)
    ? coursesData.find((course) => course.courseId === courseId)
    : coursesData.courseId === courseId
    ? coursesData
    : null;

  // If course not found, show error
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Course not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8">
          {course.title}
        </h1>

        <div className="space-y-4">
          {course.links && course.links.length > 0 ? (
            course.links.map((link, index) => (
              <div key={index} className="bg-indigo-50 p-4 rounded-lg">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Video Link {index + 1}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No links available for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseLinks;
