import { useState } from "react";

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
    // Auto-uppercase for promo code
    const processedValue = name === "code" ? value.toUpperCase() : value;
    setPromoData({ ...promoData, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Validate discount value
      const discountValue = parseFloat(promoData.discountValue);
      if (isNaN(discountValue) || discountValue <= 0) {
        throw new Error("Invalid discount value");
      }

      // Prepare data for API
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

      // Specific validation for percentage discounts
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
        // Reset form
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
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create Promo Code
      </h2>

      {submitMessage && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            messageType === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Promo Code */}
        <div>
          <label className="block text-gray-700 font-medium">Promo Code</label>
          <input
            type="text"
            name="code"
            value={promoData.code}
            onChange={handleChange}
            placeholder="SUMMER25"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
            pattern="[A-Z0-9]+"
            title="Uppercase letters and numbers only"
          />
        </div>

        {/* Discount Type */}
        <div>
          <label className="block text-gray-700 font-medium">
            Discount Type
          </label>
          <select
            name="discountType"
            value={promoData.discountType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label className="block text-gray-700 font-medium">
            {promoData.discountType === "percentage"
              ? "Percentage Discount"
              : "Fixed Discount"}
          </label>
          <input
            type="number"
            step={promoData.discountType === "percentage" ? "1" : "0.01"}
            min="0"
            max={promoData.discountType === "percentage" ? "100" : undefined}
            name="discountValue"
            value={promoData.discountValue}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Minimum Order Value */}
        <div>
          <label className="block text-gray-700 font-medium">
            Minimum Order Value ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="minOrderValue"
            value={promoData.minOrderValue}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Max Discount (for percentage) */}
        {promoData.discountType === "percentage" && (
          <div>
            <label className="block text-gray-700 font-medium">
              Maximum Discount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="maxDiscount"
              value={promoData.maxDiscount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        )}

        {/* Usage Limit */}
        <div>
          <label className="block text-gray-700 font-medium">
            Usage Limit (leave empty for unlimited)
          </label>
          <input
            type="number"
            min="1"
            name="usageLimit"
            value={promoData.usageLimit}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-700 font-medium">Expiry Date</label>
          <input
            type="datetime-local"
            name="expiryDate"
            value={promoData.expiryDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={promoData.isActive}
            onChange={(e) =>
              setPromoData({ ...promoData, isActive: e.target.checked })
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-gray-700">Active</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded-lg transition disabled:opacity-50`}
        >
          {isSubmitting ? "Creating..." : "Create Promo Code"}
        </button>
      </form>
    </div>
  );
}

export default PromoCodeForm;
