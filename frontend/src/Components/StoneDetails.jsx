import React, { useEffect, useState } from "react";

const StoneDetailsModal = ({ stoneId, onClose, onEditClick }) => {
  const [stone, setStone] = useState(stoneId);

  useEffect(() => {
    async function fetchStoneDetails() {
      try {
        const response = await fetch(`/api/stones/${stoneId}`);

        const data = await response.json();
        console.log(data);
        setStone(data);
      } catch (error) {
        console.error("Failed to fetch stone details:", error);
      }
    }
    if (stoneId) fetchStoneDetails();
  }, [stoneId]);

  if (!stone) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs relative">
        <button
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col items-center mb-4">
          <div className="w-28 h-28 bg-gray-200 rounded-md overflow-hidden mb-4">
            <img
              src={stone.image || "/placeholder.svg"}
              alt={stone.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Stone name</p>
            <h2 className="text-lg font-semibold capitalize">{stone.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Price per unit</p>
            <p className="font-semibold">₹{stone.price}</p>
            <p className="text-sm text-gray-500 mt-1">Weight</p>
            <p className="font-semibold">
              {stone.weight} {stone.unit?.toLowerCase() || ""}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Color</span>
            <span className="font-medium capitalize">{stone.color}</span>
          </div>
          <div className="flex justify-between">
            <span>Size</span>
            <span className="font-medium">{stone.size}</span>
          </div>
          <div className="flex justify-between">
            <span>Piece</span>
            <span className="font-medium">{stone.piece}</span>
          </div>
          <div className="flex justify-between">
            <span>Unit</span>
            <span className="font-medium uppercase">{stone.unit}</span>
          </div>
          <div className="flex justify-between">
            <span>Last updated on</span>
            <span className="font-medium">
              {new Date(stone.updatedAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onEditClick(stone)}
            className="bg-[#8BAD3F] text-white px-4 py-2 rounded hover:bg-[#7A9A35]"
          >
            Edit details
          </button>
        </div>
      </div>

      {stone.variants && stone.variants.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Variants</p>
          <div className="space-y-2">
            {stone.variants.map((variant, index) => (
              <div
                key={variant.id || index}
                className="flex justify-between text-sm bg-gray-100 rounded-md px-3 py-1"
              >
                <span className="capitalize">{variant.name}</span>
                <span>
                  {variant.purity}% – ₹{variant.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoneDetailsModal;
