import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { Stars } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchUserCourses = async () => {
        try {
          // console.log(user.id);
          const response = await fetch(
            `https://aadishakti-backend-ue51.onrender.com/api/courses/${user.id}/courses`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Add if using JWT
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
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B36] to-[#1A0F20] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <Stars className="text-[#87161a] h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold text-white">Your Dashboard</h1>
          </div>

          <div className="text-center text-white mb-12">
            <p className="text-2xl mb-4">Hello, {user.name}!</p>
            <p className="text-gray-300">Your purchased courses:</p>
          </div>

          {loading ? (
            <div className="text-white text-center">Loading courses...</div>
          ) : error ? (
            <div className="text-red-400 text-center">
              Error loading courses: {error}
            </div>
          ) : !courses.length === 0 ? (
            <div className="text-white text-center">
              No courses purchased yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#87161a] transition-all"
                >
                  {course.image && (
                    <div className="h-40 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() =>
                        navigate(`/courses/${course.courseId}/details`)
                      }
                      className="px-4 py-2 bg-[#87161a] text-white rounded-lg hover:bg-[#7a1535] transition"
                    >
                      Access Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
