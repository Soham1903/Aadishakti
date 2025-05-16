import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          No book data found!
        </h2>
        <button
          className="px-6 py-2 bg-[#87161a] text-white rounded-md hover:bg-[#7a1634]"
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
    formDataToSend.append("courseTitle", book.title); // sending book title as course
    formDataToSend.append("finalPrice", book.price);

    if (screenshot) {
      formDataToSend.append("screenshot", screenshot);
    } else {
      console.error("No screenshot selected!");
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
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#87161a]">Buy Book</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-64 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-lg text-gray-700 mb-2">{book.author}</p>
          <p className="text-xl text-[#87161a] mb-4">₹ {book.price}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Full Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold">
                Upload Payment Screenshot
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                required
                className="w-full"
              />
              {screenshotPreview && (
                <img
                  src={screenshotPreview}
                  alt="Screenshot Preview"
                  className="mt-2 w-48 rounded shadow"
                />
              )}
            </div>

            {error && <p className="text-red-600 font-medium">{error}</p>}
            {submitSuccess && (
              <p className="text-green-600 font-semibold">
                Purchase submitted successfully!
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#87161a] text-white rounded-md hover:bg-[#7a1634] disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyBook;
