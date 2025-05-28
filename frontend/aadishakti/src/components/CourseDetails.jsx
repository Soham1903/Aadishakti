import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useCart } from "../contexts/CartContext";
import coursesData from "../data/courses.json";
import { FadeInSection } from "./Home/FadeInSection";
import { SectionHeading } from "./Home/SectionHeading";

import {
  Clock,
  Calendar,
  Award,
  BookOpen,
  Video,
  Users,
  CheckCircle,
  ShoppingCart,
  Youtube,
} from "lucide-react";

export default function CourseDetails() {
  const { title } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const decodedTitle = decodeURIComponent(title);

  // Find the course with decoded title
  const courseFromData = coursesData.find(
    (course) => course.title.toLowerCase() === decodedTitle.toLowerCase()
  );

  // Use state to manage editable course data
  const [course, setCourse] = useState(courseFromData);

  // Update page title and scroll to top
  useEffect(() => {
    document.title = `${course?.title || 'Course'} - Aadishakti`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "Aadishakti";
    };
  }, [location, course?.title]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-600">Course not found</p>
      </div>
    );
  }

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
    navigate(`/courses/${course.title}/buy`, {
      state: {
        title: course.title,
      },
    });
  };

  const handleWatchCourse = () => {
    window.open('https://youtu.be/K6RijrUkbMs?si=ht2cplyTvy8Ld05j', '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-[80px] sm:pt-[90px] md:pt-[100px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading 
            title={isEditing ? (
              <input
                className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                name="title"
                value={course.title}
                onChange={handleChange}
              />
            ) : course.title}
            subtitle="Course Details"
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Course Image */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#87161a]/10 to-[#87161a]/30 rounded-xl blur"></div>
                <div className="relative overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Course Benefits */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
                <h3 className="text-xl font-medium text-slate-800 mb-6 flex items-center">
                  <BookOpen className="h-5 w-5 text-[#87161a] mr-2" />
                  Course Benefits
                </h3>
                <div className="space-y-2 text-slate-600">
                  {isEditing ? (
                    <textarea
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                      name="benefits"
                      value={course.benefits}
                      onChange={handleChange}
                      rows={6}
                    />
                  ) : (
                    course.benefits
                      .split("\n")
                      .filter(Boolean)
                      .map((point, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="text-[#87161a] mr-2">•</span>
                          <span>{point.trim()}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Course Syllabus */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
                <h3 className="text-xl font-medium text-slate-800 mb-6 flex items-center">
                  <BookOpen className="h-5 w-5 text-[#87161a] mr-2" />
                  Course Syllabus
                </h3>
                {isEditing ? (
                  <textarea
                    className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                    name="syllabus"
                    value={course.syllabus}
                    onChange={handleChange}
                    rows={10}
                  />
                ) : (
                  <div className="space-y-2">
                    {course.syllabus.split("\n").map((item, index, arr) => {
                      const isAathvda = item.includes("आठवडा");
                      const previousHadAathvda = index > 0 && arr[index - 1].includes("आठवडा");

                      return (
                        <React.Fragment key={index}>
                          {isAathvda && index !== 0 && !previousHadAathvda && (
                            <div className="h-4"></div>
                          )}
                          {item.trim() && (
                            <div className="flex items-start text-slate-600">
                              <span className="text-[#87161a] mr-2">•</span>
                              <span>{item.trim()}</span>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
                <h3 className="text-xl font-medium text-slate-800 mb-6">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Award,
                      title: "Certification",
                      description: "Receive an official certification upon completion",
                    },
                    {
                      icon: Video,
                      title: "Recordings",
                      description: "Lifetime access to course recordings",
                    },
                    {
                      icon: Users,
                      title: "Live Sessions",
                      description: "Interactive live sessions with experts",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="bg-slate-50/50 p-6 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="bg-white p-2 rounded-lg w-fit shadow-sm mb-4">
                        <feature.icon className="h-6 w-6 text-[#87161a]" />
                      </div>
                      <h4 className="font-medium text-slate-800 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Course Details Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-semibold text-[#87161a] mb-2">
                      {isEditing ? (
                        <input
                          className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                          name="finalPrice"
                          type="number"
                          value={course.finalPrice}
                          onChange={handleChange}
                        />
                      ) : course.finalPrice === 0 ? (
                        "Free"
                      ) : (
                        `₹${course.finalPrice}`
                      )}
                    </div>
                    <p className="text-slate-600">
                      {course.finalPrice === 0 ? "Free Course" : "One-time payment"}
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock className="w-5 h-5 text-[#87161a]" />
                      {isEditing ? (
                        <input
                          className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                          name="duration"
                          value={course.duration}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{course.duration}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-5 h-5 text-[#87161a]" />
                      {isEditing ? (
                        <input
                          className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                          name="timing"
                          value={course.timing}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{course.timing}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-[#87161a]" />
                      <span>Lifetime access</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {course.finalPrice === 0 ? (
                      <button
                        onClick={handleWatchCourse}
                        className="w-full px-4 py-3 bg-[#87161a] hover:bg-[#87161a]/90 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Youtube className="w-5 h-5" />
                        Watch Course
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleBuyNow}
                          className="w-full px-4 py-3 bg-[#87161a] hover:bg-[#87161a]/90 text-white rounded-lg font-semibold transition-colors duration-200"
                        >
                          Buy Now
                        </button>

                        <button
                          onClick={handleAddToCart}
                          className="w-full px-4 py-3 border-2 border-[#87161a] text-[#87161a] hover:bg-[#87161a] hover:text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </button>
                      </>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <button
                          onClick={isEditing ? handleSaveChanges : toggleEdit}
                          className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors duration-200"
                        >
                          {isEditing ? "Save Changes" : "Edit Course"}
                        </button>
                        <button
                          onClick={handleDelete}
                          className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200"
                        >
                          Delete Course
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}