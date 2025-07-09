import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, AlertCircle, Moon, Sun, Stars, CheckCircle, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://aadishakti-backend-ue51.onrender.com/api/v1/forgot-password/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setEmailSent(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f9f3f5] flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-yellow-500 opacity-20">
          <Sun size={60} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-purple-700 opacity-20">
          <Stars size={40} />
        </div>
        <div className="absolute top-1/4 left-1/4 text-gray-500 opacity-20">
          <Moon size={50} />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-lg bg-white/80 p-8 rounded-2xl border border-gray-200 shadow-2xl">
          {!emailSent ? (
            <>
              <div className="flex justify-center mb-6">
                <Stars className="text-[#87161a] h-12 w-12" />
              </div>

              <h2 className="text-center text-3xl font-bold text-[#87161a] mb-2">
                Recover Your Path
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Enter your email, and we'll send you a reset link
              </p>

              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87161a] focus:border-transparent text-gray-800 placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg text-white bg-[#87161a] hover:bg-[#b22550] focus:ring-2 focus:ring-offset-2 focus:ring-[#87161a] focus:ring-offset-[#f9f3f5] transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-gray-600 hover:text-[#87161a]"
                  >
                    Return to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="text-green-600 h-12 w-12" />
                </div>
              </div>

              <h2 className="text-center text-3xl font-bold text-green-600 mb-2">
                Reset Link Sent!
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Reset link sent to your mail. Please check your inbox and follow the instructions to reset your password.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Check your email
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      We sent a password reset link to <strong>{email}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleTryAgain}
                  className="w-full py-3 px-4 rounded-lg text-[#87161a] bg-white border border-[#87161a] hover:bg-[#87161a] hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#87161a] focus:ring-offset-[#f9f3f5] transition-colors"
                >
                  Send to Different Email
                </button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-gray-600 hover:text-[#87161a]"
                  >
                    Return to Login
                  </Link>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Didn't receive the email? Check your spam folder or try again with a different email address.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;