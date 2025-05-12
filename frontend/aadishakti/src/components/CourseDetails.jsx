import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useCart } from "../contexts/CartContext";
import coursesData from "../data/courses.json";
import {
  Star,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Video,
  Users,
  CheckCircle,
  ShoppingCart,
  User,
  GraduationCap,
} from "lucide-react";

export default function CourseDetails() {
  const { title } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  // Find the course in the JSON data that matches the title parameter
  const courseFromData = coursesData.find(
    (course) => course.title.toLowerCase() === title.toLowerCase()
  );

  // Use state to manage editable course data
  const [course, setCourse] = useState(courseFromData);

  const handleAddToCart = () => {
    addToCart(course);
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    // In a static version, we just update the local state
    setIsEditing(false);
    alert("Changes saved locally (no backend in static version)");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      alert("Course deleted (no backend in static version)");
      navigate("/courses");
    }
  };

  const handleBuyNow = () => {
    navigate(`/courses/${course.title}/buy`);
  };

  return (
    <div className="min-h-screen bg-[#f9f3f5]">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Title and Image Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#87161a] mb-8 text-center">
            {isEditing ? (
              <input
                className="border rounded p-2 w-full"
                name="title"
                value={course.title}
                onChange={handleChange}
              />
            ) : (
              course.title
            )}
          </h1>
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#87161a] mb-6 flex items-center gap-2">
                <User className="w-6 h-6" />
                Course Instructor
              </h2>
              <div className="flex items-center gap-4">
                <div className="bg-[#87161a] rounded-full p-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {isEditing ? (
                      <input
                        className="border rounded p-2 w-full"
                        name="instructor"
                        value={course.instructor}
                        onChange={handleChange}
                      />
                    ) : (
                      course.instructor
                    )}
                  </h3>
                  <p className="text-gray-600">Expert Astrology Instructor</p>
                </div>
              </div>
            </div>

            {/* Course Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#87161a] mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Course Benefits
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  {isEditing ? (
                    <textarea
                      className="border rounded p-2 w-full"
                      name="benefits"
                      value={course.benefits}
                      onChange={handleChange}
                    />
                  ) : (
                    course.benefits
                  )}
                </p>
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#87161a] mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Course Syllabus
              </h2>
              {isEditing ? (
                <textarea
                  className="border rounded p-2 w-full"
                  name="syllabus"
                  value={course.syllabus}
                  onChange={handleChange}
                />
              ) : (
                <ul className="list-disc list-inside space-y-2">
                  {course.syllabus.split("\n").map((item, index, arr) => {
                    const isAathvda = item.includes("आठवडा");
                    const previousHadAathvda =
                      index > 0 && arr[index - 1].includes("आठवडा");

                    return (
                      <React.Fragment key={index}>
                        {isAathvda && index !== 0 && !previousHadAathvda && (
                          <li className="h-4 list-none"></li>
                        )}
                        {item.trim() && (
                          <li className="text-gray-600">{item}</li>
                        )}
                      </React.Fragment>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#87161a] mb-6">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-[#87161a] rounded-xl">
                  <Award className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Certification
                  </h3>
                  <p className="text-white">
                    Receive an official certification upon completion
                  </p>
                </div>
                <div className="text-center p-6 bg-[#87161a] rounded-xl">
                  <Video className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Recordings
                  </h3>
                  <p className="text-white">
                    Lifetime access to course recordings
                  </p>
                </div>
                <div className="text-center p-6 bg-[#87161a] rounded-xl">
                  <Users className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Live Sessions
                  </h3>
                  <p className="text-white">
                    Interactive live sessions with experts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 sticky top-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-[#87161a] mb-2">
                  {isEditing ? (
                    <input
                      className="border rounded p-2 w-full"
                      name="price"
                      value={course.price}
                      onChange={handleChange}
                    />
                  ) : (
                    `₹${course.price}`
                  )}
                </div>
                <div className="text-gray-600">One-time payment</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-[#87161a]" />
                  {isEditing ? (
                    <input
                      className="border rounded p-2 w-full"
                      name="duration"
                      value={course.duration}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{course.duration}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#87161a]" />
                  {isEditing ? (
                    <input
                      className="border rounded p-2 w-full"
                      name="timing"
                      value={course.timing}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{course.timing}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#87161a]" />
                  <span>Lifetime access</span>
                </div>
              </div>

              <button
                className="w-full px-6 py-4 bg-[#87161a] hover:bg-[#87161a]/90 text-white rounded-xl font-bold text-lg transition-all duration-200 mb-4"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-4 border-2 border-[#87161a] text-[#87161a] hover:bg-[#87161a] hover:text-white rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>

              {user?.role === "admin" && (
                <>
                  <button
                    className={`w-full px-6 py-4 mt-5 text-white rounded-xl font-bold text-lg transition-all duration-200 ${
                      isEditing
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={isEditing ? handleSaveChanges : toggleEdit}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-6 py-4 mt-5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-all duration-200"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
