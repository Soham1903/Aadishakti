import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        `https://aadishakti-backend-ue51.onrender.com/api/v1/reset-password/${token}`,
        { newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordReset(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isPasswordReset) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-2">
          <span className="text-red-800 text-2xl">✦</span>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-center text-red-800">Reset Password</h3>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/login" className="text-gray-600 hover:text-red-800">Return to Login</a>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;