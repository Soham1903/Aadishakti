import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { UserContext } from "../UserContext";
import coursesData from "../data/courses.json";
import { FadeInSection } from "./Home/FadeInSection";
import { SectionHeading } from "./Home/SectionHeading";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setCourses(coursesData);
    setFilteredCourses(coursesData);
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchTerm, sortOption, courses]);

  useEffect(() => {
    document.title = "Courses - Aadishakti";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Aadishakti";
    };
  }, [location]);

  const handleCourseClick = (title) => {
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

    if (sortOption === "default") {
      tempCourses.sort((a, b) => Number(a.courseId) - Number(b.courseId));
    } else if (sortOption === "priceLowHigh") {
      tempCourses.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (sortOption === "priceHighLow") {
      tempCourses.sort((a, b) => b.finalPrice - a.finalPrice);
    } else if (sortOption === "free") {
      tempCourses = tempCourses.filter((course) => course.finalPrice === 0);
    }

    setFilteredCourses(tempCourses);
  };

  return (
    <div className="min-h-screen bg-white pt-[80px] sm:pt-[90px] md:pt-[100px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            title="Our Courses"
            subtitle="Discover and learn from our expert-led courses"
          />

          {/* Search & Sort Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 mt-8">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-[#87161a] h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full p-3 pl-10 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="text-[#87161a] h-5 w-5" />
              </div>
              <select
                className="w-full p-3 pl-10 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#87161a]/50"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="default">Default</option>
                <option value="free">Free Courses</option>
              </select>
            </div>
          </div>
        </FadeInSection>

        {/* Courses Grid */}
        <FadeInSection>
          {filteredCourses.length === 0 ? (
            <div className="text-center text-slate-600 p-8 bg-white rounded-xl shadow-sm border border-slate-100">
              <p className="text-lg">
                No courses found. Try different search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.courseId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow transition-all duration-300 h-full flex flex-col border border-slate-100">
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                      {course.finalPrice === 0 && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#87161a] font-medium text-sm">
                            Free
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {course.title}
                      </h3>
                      <div className="text-xl font-semibold text-[#87161a] mb-4">
                        {course.finalPrice === 0 ? (
                          "Free"
                        ) : course.originalPrice > course.finalPrice ? (
                          <>
                            <span className="text-slate-500 line-through mr-2">
                              ₹ {course.originalPrice}
                            </span>
                            <span>₹ {course.finalPrice}</span>
                          </>
                        ) : (
                          <span>₹ {course.finalPrice}</span>
                        )}
                      </div>
                      {course.benefits && (
                        <p className="text-sm text-slate-600 mb-4">
                          {course.benefits
                            .split("\n")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((point, idx) => (
                              <div key={idx} className="flex items-start">
                                <span className="text-[#87161a] mr-2">•</span>
                                <span>{point.trim()}</span>
                              </div>
                            ))}
                        </p>
                      )}
                      <div className="mt-auto">
                        <button
                          onClick={() => handleCourseClick(course.title)}
                          className="w-full px-4 py-2 bg-[#87161a] hover:bg-[#87161a]/90 text-white rounded-lg font-semibold transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </FadeInSection>
      </div>
    </div>
  );
}
