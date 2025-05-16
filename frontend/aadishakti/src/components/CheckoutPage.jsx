import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = useParams();
  const { user } = useUser();

  // Get cart data from navigation state
  const {
    items,
    totalPrice: initialTotal,
    discountedPrice: initialDiscounted,
    promoCode,
  } = location.state || {};

  const [formData, setFormData] = useState({
    customerName: user ? user.name : "",
    phoneNumber: "",
  });

  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [code, setCode] = useState(promoCode || "");
  const [totalPrice, setTotalPrice] = useState(initialTotal || 0);
  const [discountedPrice, setDiscountedPrice] = useState(
    initialDiscounted || initialTotal || 0
  );

  useEffect(() => {
    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
  }, [items, navigate]);

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

    // Create an array of course titles from the items in cart
    const courseTitles = items.map((item) => item.title);

    // Log the course titles before submitting
    console.log("Course Titles:", courseTitles);

    const formDataToSend = new FormData();
    formDataToSend.append("customerName", formData.customerName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);

    // Append all course titles
    courseTitles.forEach((title) => {
      formDataToSend.append("courseTitle", title);
    });

    formDataToSend.append("promoCode", code);
    formDataToSend.append("finalPrice", discountedPrice);

    if (screenshot) {
      formDataToSend.append("screenshot", screenshot);
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

      const data = await response.json();
      setSubmitSuccess(true);
      setFormData({
        customerName: user ? user.name : "",
        phoneNumber: "",
      });
      setScreenshot(null);
      setScreenshotPreview(null);
      setCode("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {items?.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>
                <img src={item.image} />
              </span>
              <span>{item.title}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          {/* Totals */}
          <div className="mt-6">
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total:</span>
              <span>₹{discountedPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <div className="p-4 bg-white rounded-xl shadow-md">
                <img
                  src="https://image.similarpng.com/file/similarpng/original-picture/2021/06/QR-code-sample-for-smartphone-scanning-isolated-on-transparent-background-PNG.png"
                  alt="payment-qr-code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <label className="block mb-2">Payment Screenshot</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                className="w-full p-2 border rounded"
                required
              />
              {screenshotPreview && (
                <img
                  src={screenshotPreview}
                  alt="Preview"
                  className="mt-2 h-32"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#87161a] text-white py-3 rounded-md hover:bg-[#821636] transition-colors font-medium text-lg"
            >
              {isSubmitting ? "Processing..." : "Complete Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
