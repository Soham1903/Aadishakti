// import { useState } from "react";
// import { useParams, Navigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isPasswordReset, setIsPasswordReset] = useState(false);
//   const { token } = useParams();

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         `https://aadishakti-backend-ue51.onrender.com/api/v1/reset-password/${token}`,
//         { newPassword },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success(data.message);
//       setNewPassword("");
//       setConfirmPassword("");
//       setIsPasswordReset(true);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   if (isPasswordReset) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <section className="flex justify-center items-center min-h-screen bg-white">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
//         <div className="text-center mb-2">
//           <span className="text-red-800 text-2xl">✦</span>
//         </div>
//         <h3 className="text-2xl font-bold mb-4 text-center text-red-800">
//           Reset Password
//         </h3>
//         <form onSubmit={handleResetPassword}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               New Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter new password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800"
//           >
//             Change Password
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <a href="/login" className="text-gray-600 hover:text-red-800">
//             Return to Login
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ResetPassword;

import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, CheckCircle, Lock, Eye, EyeOff, Shield, Moon, Sun, Stars } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
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
      setPasswordChanged(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        setIsPasswordReset(true);
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPasswordReset) {
    return <Navigate to="/login" />;
  }

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
          {!passwordChanged ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-[#87161a]/10 rounded-full">
                  <Lock className="text-[#87161a] h-12 w-12" />
                </div>
              </div>

              <h2 className="text-center text-3xl font-bold text-[#87161a] mb-2">
                Reset Password
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Create a new secure password for your account
              </p>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87161a] focus:border-transparent text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87161a] focus:border-transparent text-gray-800 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg text-white bg-[#87161a] hover:bg-[#b22550] focus:ring-2 focus:ring-offset-2 focus:ring-[#87161a] focus:ring-offset-[#f9f3f5] transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Change Password"
                  )}
                </button>

                <div className="text-center">
                  <a 
                    href="/login" 
                    className="text-sm text-gray-600 hover:text-[#87161a] transition-colors"
                  >
                    Return to Login
                  </a>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-green-100 rounded-full animate-pulse">
                  <CheckCircle className="text-green-600 h-12 w-12" />
                </div>
              </div>

              <h2 className="text-center text-3xl font-bold text-green-600 mb-2">
                Password Changed Successfully!
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Your password has been updated successfully. You can now login with your new password.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800 font-medium">
                      Security Update Complete
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      Your account is now secured with the new password. Redirecting to login...
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Redirecting to login page...</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <a 
                    href="/login" 
                    className="text-sm text-[#87161a] hover:text-[#b22550] font-medium transition-colors"
                  >
                    Go to Login Now
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;