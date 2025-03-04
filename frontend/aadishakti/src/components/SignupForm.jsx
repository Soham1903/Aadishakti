import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phoneno: "", gender: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError("Phone number must be 10 digits");
      setLoading(false);
      return;
    }
    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F4D9D0] px-6">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-[#D9ABAB]">
        <h2 className="text-center text-3xl font-bold text-[#921A40]">Create Your Account</h2>
        <p className="text-center text-sm text-[#C75B7A] mt-2">
          Already have an account? {" "}
          <button onClick={() => navigate("/login")} className="text-[#921A40] font-medium hover:underline">
            Log in
          </button>
        </p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-3 mt-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="ml-3 text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 p-3 mt-4">
            <p className="text-sm text-green-700">Account created! Redirecting...</p>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#921A40]">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 mt-1 border border-[#D9ABAB] rounded-md focus:ring-[#C75B7A] focus:border-[#C75B7A]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#921A40]">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 mt-1 border border-[#D9ABAB] rounded-md focus:ring-[#C75B7A] focus:border-[#C75B7A]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#921A40]">Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 mt-1 border border-[#D9ABAB] rounded-md focus:ring-[#C75B7A] focus:border-[#C75B7A]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#921A40]">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 mt-1 border border-[#D9ABAB] rounded-md focus:ring-[#C75B7A] focus:border-[#C75B7A]">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#921A40]">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="8" className="w-full p-2 mt-1 border border-[#D9ABAB] rounded-md focus:ring-[#C75B7A] focus:border-[#C75B7A]" />
          </div>

          <button type="submit" disabled={loading} className="w-full p-2 text-white bg-[#921A40] hover:bg-[#C75B7A] rounded-md font-medium focus:ring-2 focus:ring-offset-2 focus:ring-[#C75B7A] disabled:opacity-50 flex justify-center">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
