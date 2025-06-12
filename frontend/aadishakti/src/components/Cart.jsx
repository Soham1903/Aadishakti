import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart, Package2 } from "lucide-react";
import { SectionHeading } from "./Home/SectionHeading";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);
  const [appliedCode, setAppliedCode] = useState("");

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        items: cartItems,
        totalPrice,
        discountedPrice,
        promoCode: appliedCode,
      },
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (appliedCode) {
      handleApplyCoupon(); // Reapply last valid code
    } else {
      setDiscountedPrice(totalPrice); // Reset discount
    }
  }, [totalPrice]);

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
        setDiscountedPrice(totalPrice);
        toast.error("⚠️ Invalid or expired promo code. Discount: ₹0");
        setAppliedCode(""); // Clear applied code
        return;
      }

      setDiscountedPrice(data.finalAmount);
      setAppliedCode(code); // Save the valid promo
      toast.success(`✅ ${data.message}`);
    } catch (err) {
      setDiscountedPrice(totalPrice);
      setAppliedCode(""); // Clear on error
      toast.error(`⚠️ ${err.message || "Something went wrong."}`);
    }
  };

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm text-center w-full max-w-md border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Please Login first
          </h2>
          <p className="text-slate-600 mb-6">
            You need to be logged in to view your cart
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#87161a] text-white px-6 py-2 rounded-md hover:bg-[#821636] transition-colors w-full sm:w-auto"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 pt-24">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Your Shopping Cart"
          subtitle="Review and checkout your items"
          icon={<ShoppingCart className="w-6 h-6 text-[#87161a]" />}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 mt-8">
          <div className="p-6 sm:p-8">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <Package2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg mb-6">
                  Your cart is empty
                </p>
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-[#87161a] text-white px-6 py-3 rounded-md hover:bg-[#821636] transition-colors w-full sm:w-auto"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100"
                    >
                      <div className="w-full sm:w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-800 mb-1 break-words">
                          {item.title}
                        </h3>
                        <p className="text-lg text-[#87161a] font-medium">
                          ₹{item.finalPrice}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.title)}
                        className="w-full sm:w-auto px-4 py-2 text-[#87161a] border border-[#87161a] rounded-lg transition-all duration-300 font-medium text-center hover:bg-[#87161a] hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <div className="mb-6">
                    <label
                      htmlFor="coupon"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Promo Code
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        id="coupon"
                        value={code}
                        onChange={handleInputChange}
                        className="flex-1 border border-slate-300 rounded-md shadow-sm focus:ring-[#87161a] focus:border-[#87161a] px-4 py-2"
                        placeholder="Enter code"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-6 py-2 bg-[#87161a] text-white rounded-md hover:bg-[#821636] transition-colors whitespace-nowrap"
                      >
                        Apply Code
                      </button>
                    </div>
                    {appliedCode && (
                      <p className="text-sm text-green-600 mt-2">
                        Applied code: {appliedCode}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    {discountedPrice < totalPrice && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount Applied</span>
                        <span>
                          -₹{(totalPrice - discountedPrice).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-slate-800 pt-2 border-t border-slate-200">
                      <span>Total</span>
                      <span>₹{discountedPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="mt-6 w-full bg-[#87161a] text-white py-3 rounded-md hover:bg-[#821636] transition-colors font-medium text-lg"
                  >
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
