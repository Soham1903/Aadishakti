import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Upload,
  User,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Clock,
  QrCode,
} from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Book Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a book to continue with your purchase.
          </p>
          <button
            className="w-full px-6 py-3 bg-gradient-to-r from-[#87161a] to-[#7a1634] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
            onClick={() => navigate("/")}
          >
            Browse Books
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    // Basic phone number validation (Indian format)
    if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      setIsSubmitting(false);
      return;
    }

    if (!screenshot) {
      setError("Please upload a payment screenshot.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("customerName", formData.customerName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("courseTitle", book.title);
    formDataToSend.append("finalPrice", book.price);
    formDataToSend.append("screenshot", screenshot);

    try {
      const response = await fetch(
        "https://aadishakti-backend-ue51.onrender.com/api/transaction/create",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit transaction. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 pt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#87161a] mb-8 hover:text-[#7a1634] transition-colors duration-200 font-medium group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Book Details
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#87161a] to-[#7a1634] px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Complete Your Purchase
                </h1>
                <p className="text-red-100">Secure and fast checkout process</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Details - Enhanced */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 sticky top-8">
                  <div className="relative group">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full rounded-xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-[#87161a] font-bold text-sm">
                        Book
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-800 leading-tight">
                      {book.title}
                    </h2>
                    <p className="text-gray-600 font-medium">{book.author}</p>

                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="text-2xl font-bold text-[#87161a]">
                          ₹{book.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-3">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Secure Purchase
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Form - Enhanced */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Customer Information */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                      <User className="w-5 h-5 mr-2 text-[#87161a]" />
                      Customer Information
                    </h3>

                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Enter 10-digit mobile number"
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-all duration-200 bg-white resize-none"
                          rows="3"
                          placeholder="Enter your complete delivery address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                      <QrCode className="w-5 h-5 mr-2 text-[#87161a]" />
                      Payment Information
                    </h3>

                    {/* QR Code */}
                    <div className="text-center mb-6">
                      <div className="inline-block">
                        <img
                          src="/assets/qrcode.jpg"
                          alt="Payment QR Code"
                          className="w-64 h-64 object-contain mx-auto"
                        />
                      </div>
                      <p className="text-gray-600 mt-4 font-medium">
                        Scan QR code with any UPI app to make payment
                      </p>
                    </div>

                    {/* Payment Methods */}

                    {/* Screenshot Upload */}
                    <div className="relative">
                      <label className="block text-gray-700 font-semibold mb-3 flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Payment Screenshot
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          disabled={isSubmitting}
                          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#87161a] transition-colors duration-200 bg-white"
                        />
                      </div>

                      {screenshotPreview && (
                        <div className="mt-4 text-center">
                          <img
                            src={screenshotPreview}
                            alt="Screenshot Preview"
                            className="max-w-xs mx-auto rounded-xl shadow-lg"
                          />
                          <p className="text-green-600 text-sm mt-2 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Screenshot uploaded successfully
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Error/Success Messages */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">!</span>
                      </div>
                      {error}
                    </div>
                  )}

                  {submitSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                      <div>
                        <p className="font-semibold">
                          Purchase submitted successfully!
                        </p>
                        <p className="text-sm">
                          You will receive a confirmation message shortly.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#87161a] to-[#7a1634] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Complete Purchase</span>
                      </>
                    )}
                  </button>

                  {/* Security Note */}
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">
                        Your information is secure and encrypted
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyBook;
