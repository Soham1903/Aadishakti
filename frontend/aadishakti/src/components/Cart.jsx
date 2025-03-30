import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleApplyCoupon = async () => {
    if (!code) {
      toast.error("⚠️ Please enter a promo code.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/promocode/apply",
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
        setDiscountedPrice(totalPrice); // Reset price to original
        toast.error("⚠️ Invalid or expired promo code. Discount: ₹0");
        return;
      }

      setDiscountedPrice(data.finalAmount);
      toast.success(`✅ ${data.message}`);
    } catch (err) {
      setDiscountedPrice(totalPrice); // Reset to original price on failure
      toast.error(`⚠️ ${err.message || "Something went wrong."}`);
    }
  };

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your cart
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#921a40] text-white px-6 py-2 rounded-md hover:bg-[#821636] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#f9f3f5] rounded-xl shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-[#921a40] text-white px-6 py-2 rounded-md hover:bg-[#821636] transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 p-6 bg-white shadow-md rounded-xl"
                    >
                      {/* Image Container */}
                      <div className="w-20 h-20 overflow-hidden rounded-lg">
                        <img
                          src={`data:${item.image.contentType};base64,${item.image.imageBase64}`}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-lg text-gray-600 font-medium">
                          ₹{item.price}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.title)}
                        className="px-4 py-2 text-red-500 hover:text-white border border-red-500 rounded-lg transition-all duration-300 hover:bg-red-500 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
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
                        onChange={handleInputChange}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-[#921a40] focus:border-[#921a40] px-4"
                        placeholder="Enter code"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-[#921a40] text-white rounded-md hover:bg-[#821636] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600 font-bold">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    {discountedPrice < totalPrice && (
                      <div className="flex justify-between text-green-600 font-bold">
                        <span>Discount</span>
                        <span>
                          -₹{(totalPrice - discountedPrice).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                      <span>Total</span>
                      <span>₹{discountedPrice}</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-[#921a40] text-white py-3 rounded-md hover:bg-[#821636] transition-colors font-medium">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
