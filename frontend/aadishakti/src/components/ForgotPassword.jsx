import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log("Sending email:", email);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/forgot-password/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Forgot Password
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Enter your email, and we will send you a reset link.
        </p>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
