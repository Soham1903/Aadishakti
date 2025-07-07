import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";
import {
  CheckCircle,
  Loader2,
  AlertCircle,
  Moon,
  Sun,
  Stars,
  Eye,
  EyeOff,
} from "lucide-react";
import coursesData from "../data/courses.json"; // Import the static JSON file

function BuyPage() {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { courseTitle } = location.state || {};
  const decodedTitle = decodeURIComponent(title);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    customerName: user ? user.name : "",
    phoneNumber: "",
    courseTitle: decodedTitle,
  });
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [code, setCode] = useState(""); // For promo code input
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    // Find the course in the static JSON data instead of fetching from API
    try {
      const decodedTitle = decodeURIComponent(title);

      const foundCourse = coursesData.find((c) => c.title === decodedTitle);
      console.log(foundCourse);

      if (foundCourse) {
        setCourse(foundCourse);
        setTotalPrice(foundCourse.finalPrice);
        setDiscountedPrice(foundCourse.finalPrice || foundCourse.price);
      } else {
        setError("Course not found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [decodedTitle]);

  function getCourseIdByTitle(title, courses) {
    const course = courses.find((c) => c.title === title);
    return course ? course.courseId : null;
  }

  const titleToFind = decodedTitle;
  const courseId = getCourseIdByTitle(titleToFind, coursesData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCoupon = async () => {
    if (!code) {
      toast.error("⚠️ Please enter a promo code.");
      return;
    }

    try {
      const response = await fetch(
        "https://aadishakti-backend-ue51.onrender.com/api/promocode/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            code,
            orderValue: totalPrice,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Reset to original price if invalid code
        setDiscountedPrice(totalPrice);
        toast.error(`⚠️ ${data.message || "Invalid promo code"}`);
        return;
      }

      // Update with discounted price
      setDiscountedPrice(data.finalAmount);
      toast.success(`✅ ${data.message}`);
    } catch (err) {
      setDiscountedPrice(totalPrice);
      toast.error(`⚠️ ${err.message || "Failed to apply promo code"}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("customerName", formData.customerName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    // Send each course title as an array item
    if (Array.isArray(formData.courseTitle)) {
      formData.courseTitle.forEach((title) => {
        formDataToSend.append("courseTitle", title);
      });
    } else {
      formDataToSend.append("courseTitle", formData.courseTitle);
      formDataToSend.append("courseId", courseId);
    }

    formDataToSend.append("promoCode", code);
    formDataToSend.append("finalPrice", discountedPrice);
    if (screenshot) {
      formDataToSend.append("screenshot", screenshot);
    } else {
      console.error("No screenshot selected!");
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/transaction/create",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      const data = await response.json();
      setSubmitSuccess(true);
      toast.success("Payment submitted successfully!");
      setFormData({
        customerName: user ? user.name : "",
        phoneNumber: "",
        courseTitle: [],
      });
      setScreenshot(null);
      setScreenshotPreview(null);
      setCode("");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to submit payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#87161a]"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      </div>
    );

  // Payment Success Screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 pt-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-2">
            Your payment has been submitted successfully.
          </p>
          <p className="text-gray-600 mb-2">
            We'll verify your payment and send you access details soon.
          </p>
          <p className="text-sm text-[#87161a] mb-8 font-medium bg-[#87161a]/10 p-3 rounded-lg">
            Check your dashboard to view courses. Your purchased course will be
            visible on your dashboard once payment is verified.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-[#87161a] text-white py-3 rounded-lg hover:bg-[#721419] transition-colors font-medium"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Browse More Courses
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl ">
          {/* Course Header */}
          <div className="bg-[#87161a] text-white p-8 mt-11 rounded-lg">
            <h1 className="text-3xl font-bold text-center">
              Complete Your Purchase
            </h1>
          </div>

          {/* Course Details Card */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform transition hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between text-gray-600">
                    <span>Original Price</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>

                  {discountedPrice < totalPrice && (
                    <>
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount Applied</span>
                        <span>
                          -₹{(totalPrice - discountedPrice).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Promo Code</span>
                        <span>{code}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                    <span>Total Amount</span>
                    <span
                      className={
                        discountedPrice < totalPrice ? "text-green-600" : ""
                      }
                    >
                      ₹{discountedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#87161a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>3 months Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#87161a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Certificate of Completion</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="mb-6">
                <label
                  htmlFor="coupon"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="coupon"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#87161a] focus:border-[#87161a] px-4 py-2"
                    placeholder="Enter promo code"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-[#87161a] text-white rounded-md hover:bg-[#7a1635] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-center mb-6">
                Scan QR Code to Make Payment
              </h3>
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-sm bg-white p-4 rounded-2xl shadow-lg">
                  <img
                    src="/assets/qrcode.jpg"
                    alt="Payment QR Code"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Transaction Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#87161a] focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#87161a] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#87161a] transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#87161a] hover:text-[#87161a] focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {screenshotPreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Screenshot Preview:
                    </p>
                    <img
                      src={screenshotPreview}
                      alt="Screenshot Preview"
                      className="w-40 h-40 object-cover rounded-lg border-2 border-[#87161a]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold text-white transition-all duration-200 ${
                  isSubmitting
                    ? "bg-opacity-75 cursor-not-allowed bg-[#87161a]"
                    : "bg-[#87161a] hover:bg-[#7a1635] transform hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Complete Purchase"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;
