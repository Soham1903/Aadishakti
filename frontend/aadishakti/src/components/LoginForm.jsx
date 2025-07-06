import React, { useState } from "react";
import { Loader2, AlertCircle, Moon, Sun, Stars, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Input validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      // Check if API endpoint is reachable
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(
        "https://aadishakti-backend-ue51.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      // Handle different HTTP status codes
      if (response.status === 0) {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      }

      // Parse response JSON
      let data;
      try {
        const responseText = await response.text();
        data = responseText ? JSON.parse(responseText) : {};
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        // If JSON parsing fails, handle based on status code
        if (!response.ok) {
          switch (response.status) {
            case 400:
            case 401:
              throw new Error("Invalid email or password");
            case 403:
              throw new Error("Account access denied. Please contact support.");
            case 404:
              throw new Error(
                "Login service not found. Please try again later."
              );
            case 422:
              throw new Error("Invalid login credentials provided");
            case 429:
              throw new Error(
                "Too many login attempts. Please try again later."
              );
            case 500:
              throw new Error(
                "Server error. Please try again in a few minutes."
              );
            case 502:
            case 503:
            case 504:
              throw new Error(
                "Service temporarily unavailable. Please try again later."
              );
            default:
              throw new Error(
                `Login failed. Please try again. (Error: ${response.status})`
              );
          }
        }
        throw new Error("Invalid response from server. Please try again.");
      }

      // Handle specific HTTP status codes with server response
      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error(
              data.message || "Invalid login credentials provided"
            );
          case 401:
            throw new Error(data.message || "Invalid email or password");
          case 403:
            throw new Error(
              data.message || "Account access denied. Please contact support."
            );
          case 404:
            throw new Error("Login service not found. Please try again later.");
          case 422:
            throw new Error(data.message || "Invalid data provided");
          case 429:
            throw new Error("Too many login attempts. Please try again later.");
          case 500:
            throw new Error("Server error. Please try again in a few minutes.");
          case 502:
          case 503:
          case 504:
            throw new Error(
              "Service temporarily unavailable. Please try again later."
            );
          default:
            throw new Error(
              data.message || `Login failed (${response.status})`
            );
        }
      }

      // Validate response data structure
      if (!data.token) {
        throw new Error("Invalid response: Missing authentication token");
      }

      if (!data.user) {
        throw new Error("Invalid response: Missing user information");
      }

      // Validate token format (basic check)
      if (typeof data.token !== "string" || data.token.length < 10) {
        throw new Error("Invalid authentication token received");
      }

      // Store user data safely
      try {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (storageError) {
        console.error("Failed to save user data:", storageError);
        throw new Error("Failed to save login session. Please try again.");
      }

      console.log("Login successful:", data.user);
      setSuccess(true);

      // Navigate after a short delay
      setTimeout(() => {
        try {
          // Since we don't have router setup, we'll just reload the page
          window.location.href = "/";
        } catch (navError) {
          console.error("Navigation failed:", navError);
          // Fallback to window location
          window.location.href = "/";
        }
      }, 2000);
    } catch (err) {
      console.error("Login error:", err);

      // Handle different types of errors
      if (err.name === "AbortError") {
        setError(
          "Request timed out. Please check your connection and try again."
        );
      } else if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Network error. Please check your internet connection.");
      } else if (err.message.includes("JSON")) {
        setError("Server response error. Please try again.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#ffffff] flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-yellow-500 opacity-30">
          <Sun size={60} />
        </div>
        <div className="absolute top-1/4 right-1/4 text-gray-500 opacity-20">
          <Stars size={40} />
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-gray-400 opacity-20">
          <Moon size={50} />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl border border-gray-200 shadow-2xl">
          <div className="flex justify-center mb-6">
            <Stars className="text-[#87161a] h-12 w-12" />
          </div>

          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#87161a] hover:text-[#b22550] transition-colors">
              Sign up
            </a>
          </p>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-r">
              <p className="text-sm text-green-700">
                Login successful! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87161a] focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87161a] focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:text-[#87161a]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-[#87161a] transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white bg-[#87161a] hover:bg-[#b22550] focus:ring-2 focus:ring-offset-2 focus:ring-[#87161a] focus:ring-offset-[#f9f3f5] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;