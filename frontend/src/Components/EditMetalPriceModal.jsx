"use client";

import { useState } from "react";
import { XIcon } from "./Icons";
import { updateMetalPrice } from "../api/metalApi";

const EditMetalPriceModal = ({ metalId, allMetal, onClose }) => {
  const [price, setPrice] = useState(metal.price);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price <= 0) {
      setError("Price must be greater than zero");
      return;
    }

    try {
      setLoading(true);
      await updateMetalPrice(metal._id, price);
      onClose();
    } catch (err) {
      console.error("Error updating metal price:", err);
      setError("Failed to update price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg">Update {metal.name} Price</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price per gram (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
              step="0.01"
              min="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Price"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMetalPriceModal;
