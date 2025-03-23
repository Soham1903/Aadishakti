import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { Stars } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B36] to-[#1A0F20] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <Stars className="text-[#921a40] h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold text-white">Welcome to Your Dashboard</h1>
          </div>
          
          <div className="text-center text-white">
            <p className="text-2xl mb-4">Hello, {user.name}!</p>
            <p className="text-gray-300">Welcome to your personal astrology journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;