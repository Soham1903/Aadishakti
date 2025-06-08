import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { ShoppingCart, User, Phone, Upload, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = useParams();
  const { user } = useUser();
  const { clearCart } = useCart();

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
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
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

  // Phone number validation
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    return phoneRegex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear general error when user types
    
    // Validate phone number in real-time
    if (name === "phoneNumber") {
      if (value && !validatePhoneNumber(value)) {
        setPhoneError("Please enter a valid 10-digit Indian phone number");
      } else {
        setPhoneError("");
      }
    }
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
    setError("");

    // Validate phone number before submission
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number");
      setIsSubmitting(false);
      return;
    }

    // Create an array of course titles from the items in cart
    const courseTitles = items.map((item) => item.title);

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
      
      // Clear the cart after successful payment
      clearCart();
      
      setSubmitSuccess(true);
      toast.success("Payment submitted successfully! Your cart has been cleared.");
      setFormData({
        customerName: user ? user.name : "",
        phoneNumber: "",
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

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 pt-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-2">
            Your payment has been submitted successfully.
          </p>
          <p className="text-gray-600 mb-2">
            We'll verify your payment and send you access details soon.
          </p>
          <p className="text-sm text-green-600 mb-8 font-medium">
            Your cart has been cleared automatically.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/courses")}
              className="w-full bg-[#87161a] text-white py-3 rounded-lg hover:bg-[#721419] transition-colors font-medium"
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
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase to get instant access</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Order Summary - Left Side */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#87161a] rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4">
                {items?.map((item, index) => (
                  <div key={item.id || index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-gradient-to-br from-[#87161a] to-[#a91d23] flex items-center justify-center" style={{display: item.image ? 'none' : 'flex'}}>
                        <span className="text-white font-bold text-sm">Course</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 leading-tight">{item.title}</h3>
                      <p className="text-sm text-gray-600">Digital Course Access</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-[#87161a]">₹{item.finalPrice || item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items?.length} item{items?.length > 1 ? 's' : ''})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  {promoCode && totalPrice !== discountedPrice && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({promoCode})</span>
                      <span>-₹{(totalPrice - discountedPrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-[#87161a]">₹{discountedPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Payment Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="text-center">
                <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border-4 border-gray-100 mb-4">
                  <img
                    src="https://image.similarpng.com/file/similarpng/original-picture/2021/06/QR-code-sample-for-smartphone-scanning-isolated-on-transparent-background-PNG.png"
                    alt="Payment QR Code"
                    className="w-48 h-48 object-contain mx-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center mx-auto" style={{display: 'none'}}>
                    <CreditCard className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">QR Code</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">Scan this QR code to make payment</p>
                <p className="text-sm text-gray-500">Or use UPI ID: your-upi@bank</p>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">Amount to Pay: ₹{discountedPrice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-colors ${
                      phoneError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                    required
                  />
                  {phoneError && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {phoneError}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Format: 9876543210</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Payment Screenshot
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#87161a] transition-colors">
                    <div className="space-y-1 text-center">
                      {screenshotPreview ? (
                        <div className="relative">
                          <img
                            src={screenshotPreview}
                            alt="Payment Screenshot Preview"
                            className="mx-auto h-32 w-auto rounded-lg shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setScreenshot(null);
                              setScreenshotPreview(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <label
                              htmlFor="screenshot-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-[#87161a] hover:text-[#721419] focus-within:outline-none"
                            >
                              <span>Upload payment screenshot</span>
                              <input
                                id="screenshot-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotChange}
                                className="sr-only"
                                required
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || phoneError}
                  className="w-full bg-[#87161a] text-white py-4 rounded-lg hover:bg-[#721419] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Complete Payment - ₹{discountedPrice}
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;