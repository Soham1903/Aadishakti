import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { BookOpen, User, ArrowRight } from "lucide-react";
import { FaUserGraduate, FaStar, FaBook, FaChartLine } from "react-icons/fa";
import { GiCrystalBall } from "react-icons/gi";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Marathi astrology tips
  const astrologyTips = [
    "नियमित अभ्यास करा आणि ज्योतिषशास्त्राची मूलभूत तत्त्वे समजून घ्या.",
    "राशिचक्र आणि ग्रहांचे स्थान समजून घेणे महत्वाचे आहे.",
    "दैनिक १५ मिनिटे ज्योतिष अभ्यासासाठी वेळ काढा.",
    "व्यावहारिक उदाहरणांसह ज्योतिष शिका आणि त्याचा वापर करा.",
    "धैर्य ठेवा - ज्योतिषशास्त्र हे एक सखोल विषय आहे जो वेळ मागतो."
  ];

  const [currentTip] = useState(() => {
    const today = new Date().getDate();
    return astrologyTips[today % astrologyTips.length];
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchUserCourses = async () => {
        try {
          const response = await fetch(
            `https://aadishakti-backend-ue51.onrender.com/api/courses/${user.id}/courses`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data.data);
          setCourses(data.data.courses);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUserCourses();
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Header Section with responsive padding */}
      <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Dashboard Header */}
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-[#921a40] to-[#b91c47] rounded-xl sm:rounded-2xl shadow-lg w-fit">
                <FaStar className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                  My Dashboard
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">
                  Welcome back, {user.name}! Continue your learning journey
                </p>
              </div>
            </div>
            
            {/* User Profile Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-[#921a40] to-[#b91c47] rounded-full">
                  <FaUserGraduate className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Active Learner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Progress Overview - Responsive */}
          <div className="mb-8 sm:mb-10">
            <div className="bg-gradient-to-r from-[#921a40] to-[#b91c47] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-12 sm:translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6 sm:translate-y-8 sm:-translate-x-8"></div>
              
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Learning Progress</h2>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg">Keep up the great work!</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold">{courses.length}</div>
                      <div className="text-xs sm:text-sm text-white/80">Active Courses</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5">
                    <div className="flex items-center space-x-3 mb-3">
                      <FaBook className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      <span className="font-semibold text-sm sm:text-base">Enrolled Courses</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">{courses.length}</div>
                    <div className="text-xs sm:text-sm text-white/80">Continue learning</div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5">
                    <div className="flex items-center space-x-3 mb-3">
                      <FaChartLine className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      <span className="font-semibold text-sm sm:text-base">Progress</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">65%</div>
                    <div className="text-xs sm:text-sm text-white/80">Average completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Tips Section - Responsive */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-red-100">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="p-3 sm:p-4 bg-red-100 rounded-lg sm:rounded-xl w-fit">
                  <GiCrystalBall className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">🌟 आजचा ज्योतिष शिक्षण सल्ला</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {currentTip}
                  </p>
                  <div className="flex items-center text-xs sm:text-sm text-red-600 font-medium">
                    <span>Ready to continue learning?</span>
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Courses Section - Responsive */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">My Courses</h3>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <span className="text-sm sm:text-base lg:text-lg text-gray-500">
                  {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled
                </span>
                {courses.length > 0 && (
                  <button 
                    onClick={() => navigate('/courses')}
                    className="text-[#921a40] hover:text-[#7a1535] font-medium text-sm sm:text-base lg:text-lg flex items-center space-x-2 transition-colors w-fit"
                  >
                    <span>Browse More Courses</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col sm:flex-row items-center justify-center py-16 sm:py-20 space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-[#921a40]"></div>
                <span className="text-base sm:text-lg text-gray-600">Loading your courses...</span>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-10 text-center">
                <div className="text-red-600 font-medium mb-3 text-base sm:text-lg">{error}</div>
                <div className="text-red-500 text-sm sm:text-base">Unable to load courses</div>
              </div>
            ) : courses.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-8 sm:p-12 lg:p-16 text-center">
                <div className="p-4 sm:p-6 bg-gray-50 rounded-full w-fit mx-auto mb-6 sm:mb-8">
                  <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                </div>
                <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Start Your Learning Journey</h4>
                <p className="text-gray-600 mb-8 sm:mb-10 max-w-md mx-auto text-sm sm:text-base lg:text-lg">
                  You haven't enrolled in any courses yet. Explore our course catalog and find something that interests you!
                </p>
                <button 
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-[#921a40] text-white font-semibold rounded-lg sm:rounded-xl hover:bg-[#7a1535] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-sm sm:text-base lg:text-lg"
                >
                  Browse Courses
                  <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#921a40]/20 transition-all duration-300 group cursor-pointer"
                    onClick={() => navigate(`/courses/${course.courseId}/details`)}
                  >
                    {course.image && (
                      <div className="h-40 sm:h-48 lg:h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#921a40] transition-colors">
                          {course.title}
                        </h4>
                        
                        <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                          <span className="text-sm sm:text-base lg:text-lg">{course.instructor}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 sm:mb-8 line-clamp-3 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {course.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-6 sm:mb-8">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="text-xs sm:text-sm font-medium text-gray-600">Progress</span>
                          <span className="text-xs sm:text-sm text-gray-500">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div className="bg-gradient-to-r from-[#921a40] to-[#b91c47] h-2 sm:h-3 rounded-full transition-all duration-300" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <button className="w-full inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-[#921a40] text-white font-semibold rounded-lg sm:rounded-xl hover:bg-[#7a1535] transition-all group-hover:shadow-lg transform group-hover:-translate-y-0.5 text-sm sm:text-base lg:text-lg">
                        Continue Learning
                        <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;