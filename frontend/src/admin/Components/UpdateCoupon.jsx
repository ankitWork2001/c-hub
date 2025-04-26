import React, { useState } from "react";
import axios from "axios";

const UpdateCoupon = ({ initialData }) => {
  const [formData, setFormData] = useState({ ...initialData });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_BACKEND}api/coupons/${initialData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Coupon updated successfully");
      window.location.reload();
    } catch (err) {
      alert("Failed to update coupon");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Update Coupon</h2>

      <div>
        <label className="font-medium text-gray-700">Coupon Code</label>
        <input
          type="text"
          name="couponCode"
          value={formData.couponCode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Discount Type</label>
        <select
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Discount Type</option>
          <option value="percentage">Percentage</option>
          <option value="flat">Flat</option>
        </select>
      </div>

      <div>
        <label className="font-medium text-gray-700">Discount Value</label>
        <input
          type="number"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Affiliate Link</label>
        <input
          type="text"
          name="affiliateLink"
          value={formData.affiliateLink}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate?.slice(0, 10)}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Max Discount Cap</label>
        <input
          type="number"
          name="maxDiscountCap"
          value={formData.maxDiscountCap || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">
          Minimum Purchase Amount
        </label>
        <input
          type="number"
          name="minimumPurchaseAmount"
          value={formData.minimumPurchaseAmount || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Target Audience</label>
        <input
          type="text"
          name="targetAudience"
          value={formData.targetAudience || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Terms & Conditions</label>
        <input
          type="text"
          name="terms"
          value={formData.terms || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-700">Featured</label>
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={() =>
            setFormData((prev) => ({ ...prev, featured: !prev.featured }))
          }
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Update Coupon
      </button>
    </form>
  );
};

export default UpdateCoupon;
