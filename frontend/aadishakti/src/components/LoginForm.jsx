import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("token", data.token);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F4D9D0] px-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-[#D9ABAB]">
        <h2 className="text-center text-3xl font-bold text-[#921A40]">Log in to Your Account</h2>
        <p className="text-center text-sm text-[#C75B7A] mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#921A40] font-medium hover:underline">
            Sign up
          </Link>
        </p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-3 mt-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="ml-3 text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 p-3 mt-4">
            <p className="text-sm text-green-700">Login successful! Redirecting...</p>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#921A40]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-[#D9ABAB] rounded-md focus:ring-[#C75B7A] focus:border-[#C75B7A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#921A40]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-[#D9ABAB] rounded-md focus:ring-[#C75B7A] focus:border-[#C75B7A]"
            />
          </div>

          <div className="flex justify-between">
            <Link to="/forgot-password" className="text-sm text-[#C75B7A] hover:text-[#921A40]">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#921A40] hover:bg-[#C75B7A] focus:ring-2 focus:ring-[#C75B7A] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
