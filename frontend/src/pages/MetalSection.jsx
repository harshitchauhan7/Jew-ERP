import React, { useState, useEffect } from "react";

const MetalSection = ({
  metals = [],
  viewMode,
  onAddClick,
  setEditorMode,
  setDocId,
}) => {
  const [metalList, setMetalList] = useState([]);
  const [confirmToggle, setConfirmToggle] = useState({
    show: false,
    metalId: null,
  });

  useEffect(() => {
    setMetalList(metals.map((m) => ({ ...m, isActive: m.isActive ?? true })));
  }, [metals]);

  const handleRequestToggle = (id) => {
    setConfirmToggle({ show: true, metalId: id });
  };

  const handleConfirmToggle = () => {
    const { metalId } = confirmToggle;
    setMetalList((prev) =>
      prev.map((metal) =>
        metal.id === metalId ? { ...metal, isActive: !metal.isActive } : metal
      )
    );
    setConfirmToggle({ show: false, metalId: null });
  };

  const handleCancelToggle = () => {
    setConfirmToggle({ show: false, metalId: null });
  };

  const handleEditDetails = (id) => {
    setEditorMode(true);
    setDocId(id);
    console.log(`Edit metal with id: ${id}`);
  };

  return (
    <div className="relative">
      {/* METAL GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {metalList.map((metal) => (
          <div
            key={metal.id}
            className="bg-white rounded-md overflow-hidden shadow"
          >
            <div className="h-40 bg-gray-200">
              <img
                src={metal.image || "/placeholder.svg"}
                alt={metal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{metal.name}</h3>
                <span className="text-sm">
                  ₹{metal.standardPurityPrice.toFixed(2)}/gm
                </span>
              </div>
              <div className="flex items-center justify-between">
                {/* Toggle Button */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={metal.isActive}
                    onChange={() => handleRequestToggle(metal.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8BAD3F] transition-colors duration-300">
                    <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300" />
                  </div>
                </label>

                <button
                  className="px-3 py-1 bg-[#8BAD3F] text-white text-sm rounded-md hover:bg-[#7A9A35]"
                  onClick={() => handleEditDetails(metal._id)}
                >
                  Edit details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Metal Button */}
      <button
        className="fixed bottom-6 right-6 flex items-center justify-center px-4 py-2 bg-[#8BAD3F] text-white rounded-md shadow-lg hover:bg-[#7A9A35]"
        onClick={onAddClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add new metal
      </button>

      {/* CONFIRMATION MODAL */}
      {confirmToggle.show && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">
              Confirm Status Change
            </h2>
            <p className="mb-4">
              Are you sure you want to change the status of this metal?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelToggle}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmToggle}
                className="px-4 py-2 bg-[#8BAD3F] text-white rounded hover:bg-[#7A9A35]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetalSection;
