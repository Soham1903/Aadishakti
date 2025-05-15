import { useState } from "react";
import { Moon, Stars, Sparkles } from "lucide-react";

function PromoCodeForm() {
  const [promoData, setPromoData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
    isActive: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "code" ? value.toUpperCase() : value;
    setPromoData({ ...promoData, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const discountValue = parseFloat(promoData.discountValue);
      if (isNaN(discountValue) || discountValue <= 0) {
        throw new Error("Invalid discount value");
      }

      const formattedData = {
        code: promoData.code.trim(),
        discountType: promoData.discountType,
        discountValue,
        minOrderValue: promoData.minOrderValue
          ? parseFloat(promoData.minOrderValue)
          : 0,
        maxDiscount: promoData.maxDiscount
          ? parseFloat(promoData.maxDiscount)
          : null,
        usageLimit: promoData.usageLimit ? parseInt(promoData.usageLimit) : 1,
        expiryDate: new Date(promoData.expiryDate).toISOString(),
        isActive: promoData.isActive,
      };

      if (formattedData.discountType === "percentage" && discountValue > 100) {
        throw new Error("Percentage discount cannot exceed 100%");
      }

      const response = await fetch("http://localhost:4000/api/promocode/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Promo code created successfully!");
        setMessageType("success");
        setPromoData({
          code: "",
          discountType: "percentage",
          discountValue: "",
          minOrderValue: "",
          maxDiscount: "",
          usageLimit: "",
          expiryDate: "",
          isActive: true,
        });
      } else {
        throw new Error(data.message || "Failed to create promo code");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage(error.message);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto">
      <div className="bg-white bg-opacity-95 backdrop-blur-lg shadow-lg rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6">
          <Stars className="w-24 h-24 text-gray-100" />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Moon className="w-8 h-8 text-gray-700" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Promo Code
          </h2>
        </div>

        {submitMessage && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center gap-2 ${
              messageType === "error"
                ? "bg-red-50 text-red-700 border border-red-100"
                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Promo Code
              </label>
              <input
                type="text"
                name="code"
                value={promoData.code}
                onChange={handleChange}
                placeholder="SUMMER25"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent bg-white placeholder-gray-400 transition-all duration-200"
                required
                pattern="[A-Z0-9]+"
                title="Uppercase letters and numbers only"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Discount Type
              </label>
              <select
                name="discountType"
                value={promoData.discountType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent bg-white transition-all duration-200"
                required
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {promoData.discountType === "percentage"
                  ? "Percentage Discount"
                  : "Fixed Discount"}
              </label>
              <input
                type="number"
                step={promoData.discountType === "percentage" ? "1" : "0.01"}
                min="0"
                max={
                  promoData.discountType === "percentage" ? "100" : undefined
                }
                name="discountValue"
                value={promoData.discountValue}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent bg-white transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Minimum Order Value ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="minOrderValue"
                value={promoData.minOrderValue}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent bg-white transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promoData.discountType === "percentage" && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Maximum Discount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="maxDiscount"
                  value={promoData.maxDiscount}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent bg-white transition-all duration-200"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Usage Limit
              </label>
              <input
                type="number"
                min="1"
                name="usageLimit"
                value={promoData.usageLimit}
                onChange={handleChange}
                placeholder="Leave empty for unlimited"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent bg-white transition-all duration-200 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Expiry Date
            </label>
            <input
              type="datetime-local"
              name="expiryDate"
              value={promoData.expiryDate}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent bg-white transition-all duration-200"
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={promoData.isActive}
              onChange={(e) =>
                setPromoData({ ...promoData, isActive: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-[#87161a] focus:ring-[#87161a] transition-colors duration-200"
            />
            <label className="text-gray-700">Active</label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting
                ? "bg-[#87161a]/60"
                : "bg-[#87161a] hover:bg-[#7c1635]"
            } text-white py-3 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm`}
          >
            <Sparkles className="w-5 h-5" />
            {isSubmitting ? "Creating..." : "Create Promo Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PromoCodeForm;
