import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice, discountedPrice, applyCoupon } = useCart();
  const [code, setCode] = useState("");

  const handleApplyCoupon = () => {
    applyCoupon(code);
    setCode("");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto min-h-screen bg-[#f9f3f5]">
      <h2 className="text-3xl font-bold mb-6 text-[#921a40]">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">No items in cart!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.title)}
                className="text-[#921a40] hover:text-red-600 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Coupon Section */}
          <div className="mt-6">
            <label htmlFor="coupon" className="block mb-2 font-semibold text-gray-700">
              Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                id="coupon"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter coupon code"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-[#921a40] text-white rounded-lg hover:bg-[#921a40]/90 transition-all"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-8 p-4 bg-white rounded-xl shadow-md space-y-3">
            <div className="flex justify-between text-lg">
              <span className="text-gray-700">Total Price:</span>
              <span className="text-gray-900 font-bold">${totalPrice}</span>
            </div>
            {discountedPrice < totalPrice && (
              <div className="flex justify-between text-lg text-green-600">
                <span>Discounted Price:</span>
                <span className="font-bold">${discountedPrice}</span>
              </div>
            )}
            <button className="mt-4 w-full py-3 bg-[#921a40] text-white rounded-lg hover:bg-[#921a40]/90 font-semibold">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
