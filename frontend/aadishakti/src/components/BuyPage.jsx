import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";

function BuyPage() {
  const { title } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    customerName: user ? user.name : "",
    phoneNumber: "",
    courseTitle: title,
  });
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/courses/${title}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [title]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("customerName", formData.customerName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("courseTitle", formData.courseTitle);
    if (screenshot) {
      formDataToSend.append("screenshot", screenshot);
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
      // Reset form after successful submission
      setFormData({
        customerName: user ? user.name : "",
        phoneNumber: "",
        courseTitle: title,
      });
      setScreenshot(null);
      setScreenshotPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4 mt-4">
        Course Details
      </h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="w-full sm:w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
          <img
            src={`data:${course.image.contentType};base64,${course.image.imageBase64}`}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-800">
            {course.title}
          </h2>
          <p className="text-lg text-gray-600">
            Price: <span className="font-bold">${course.price}</span>
          </p>
        </div>
      </div>

      <h3 className="mt-6 text-lg font-semibold">
        Pay using the QR Code below:
      </h3>
      <img
        src="https://image.similarpng.com/file/similarpng/original-picture/2021/06/QR-code-sample-for-smartphone-scanning-isolated-on-transparent-background-PNG.png"
        alt="payment-qr-code"
        className="w-40 mx-auto mt-4"
      />

      <h2 className="mt-8 text-xl font-semibold">Submit Transaction Details</h2>

      {submitSuccess && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          Transaction submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Customer Name:
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Upload Payment Screenshot:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleScreenshotChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {screenshotPreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">Screenshot Preview:</p>
              <img
                src={screenshotPreview}
                alt="Screenshot Preview"
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg transition ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isSubmitting ? "Submitting..." : "Submit Transaction"}
        </button>
      </form>
    </div>
  );
}

export default BuyPage;
