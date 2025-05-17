import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BuyBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
  });
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          No book data found!
        </h2>
        <button
          className="px-6 py-3 bg-[#87161a] text-white rounded-xl hover:bg-[#7a1634] transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Back to Books
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("customerName", formData.customerName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("courseTitle", book.title);
    formDataToSend.append("finalPrice", book.price);

    if (screenshot) {
      formDataToSend.append("screenshot", screenshot);
    } else {
      setError("Please upload a payment screenshot.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "https://aadishakti-backend-ue51.onrender.com/api/transaction/create",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      await response.json();
      setSubmitSuccess(true);
      setFormData({
        customerName: "",
        phoneNumber: "",
        address: "",
      });
      setScreenshot(null);
      setScreenshotPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-[#87161a] mb-8 hover:underline font-medium"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Book Details
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-[#87161a]">Complete Your Purchase</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-xl p-6">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-lg shadow-md mb-6"
              />
              <h2 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2 italic">{book.author}</p>
              <p className="text-2xl font-bold text-[#87161a]">₹ {book.price}</p>
            </div>
          </div>

          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#87161a] focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#87161a] focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#87161a] focus:border-transparent h-32"
                  placeholder="Enter your complete delivery address"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Payment Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-[#87161a] focus:border-transparent"
                />
                {screenshotPreview && (
                  <img
                    src={screenshotPreview}
                    alt="Screenshot Preview"
                    className="mt-4 max-w-xs rounded-lg shadow"
                  />
                )}
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl font-medium">
                  {error}
                </div>
              )}
              
              {submitSuccess && (
                <div className="bg-green-50 text-green-600 p-4 rounded-xl font-medium">
                  Purchase submitted successfully!
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#87161a] text-white rounded-xl hover:bg-[#7a1634] transition-colors duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Complete Purchase"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyBook;