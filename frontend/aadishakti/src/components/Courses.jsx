import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { UserContext } from "../UserContext";
import coursesData from "../data/courses.json"; // Import your local JSON file

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priceLowHigh");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Load data directly from imported JSON
    setCourses(coursesData);
    setFilteredCourses(coursesData);
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchTerm, sortOption, courses]);

  // Update page title when component mounts
  useEffect(() => {
    document.title = "Courses - Aadishakti";

    // Scroll to top when navigating to this page
    window.scrollTo(0, 0);

    return () => {
      document.title = "Aadishakti";
    };
  }, [location]);

  const handleCourseClick = (title) => {
    // Find the exact course with correct casing
    const course = coursesData.find(
      (c) => c.title.toLowerCase() === title.toLowerCase()
    );

    if (course) {
      navigate(`/courses/${course.title}`);
    }
  };

  const handleSearchAndSort = () => {
    let tempCourses = [...courses];

    if (searchTerm) {
      tempCourses = tempCourses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "priceLowHigh") {
      tempCourses.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      tempCourses.sort((a, b) => b.price - a.price);
    } else if (sortOption === "free") {
      tempCourses = tempCourses.filter((course) => course.finalPrice === 0);
    }

    setFilteredCourses(tempCourses);
  };

  return (
    <div className="min-h-screen bg-white pt-[80px] sm:pt-[90px] md:pt-[100px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#87161a] mb-6 text-center">
          Our Courses
        </h1>

        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-[#87161a] h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full p-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-[#87161a] h-5 w-5" />
            </div>
            <select
              className="w-full p-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="free">Free Courses</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">
              No courses found. Try different search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                key={course.courseId}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#87161a]/10 flex flex-col justify-between"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <h3 className="text-xl font-bold text-[#87161a] mb-2">
                    {course.title}
                  </h3>
                  <div className="text-xl font-semibold text-gray-800 mb-4">
                    {course.finalPrice === 0 ? (
                      "Free"
                    ) : course.originalPrice > course.finalPrice ? (
                      <>
                        <span className="text-gray-500 line-through mr-2">
                          ₹ {course.originalPrice}
                        </span>
                        <span>₹ {course.finalPrice}</span>
                      </>
                    ) : (
                      <span>₹ {course.finalPrice}</span>
                    )}
                  </div>
                  {course.benefits && (
                    <p className="text-sm text-gray-600 mb-2">
                      {course.benefits
                        .split("•")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((point, idx) => (
                          <div key={idx}>• {point.trim()}.</div>
                        ))}
                    </p>
                  )}

                  <div className="space-y-3 mt-auto">
                    <button
                      onClick={() => handleCourseClick(course.title)}
                      className="w-full px-4 py-2 bg-[#87161a] hover:bg-[#87161a]/90 text-white rounded-lg font-semibold transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}