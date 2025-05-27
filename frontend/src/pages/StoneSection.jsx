import { useState } from "react";
import StoneDetailsModal from "../Components/StoneDetails";
import StoneEditModal from "./EditStones";
import { useEffect } from "react";

const StoneSection = ({ stones, viewMode, onAddClick, setStoneState }) => {
  const [activeStatus, setActiveStatus] = useState(() =>
    stones.reduce((acc, stone) => {
      acc[stone._id] = true; // default all to active
      return acc;
    }, {})
  );
  const [selectedId, setSelectedId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const [selectedStoneId, setSelectedStoneId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStone, setEditingStone] = useState(null);

  const handleToggleClick = (id) => {
    setSelectedId(id);
    setNextStatus(!activeStatus[id]);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setActiveStatus((prev) => ({
      ...prev,
      [selectedId]: nextStatus,
    }));
    setShowConfirm(false);
    setSelectedId(null);
    setNextStatus(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedId(null);
    setNextStatus(null);
  };

  const handleEditDetails = (id) => {
    setSelectedStoneId(id);
  };

  return (
    <div className="relative">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stones.map((stone) => (
            <div
              key={stone._id}
              className="bg-white rounded-md overflow-hidden shadow"
            >
              <div className="h-40 bg-gray-200">
                <img
                  src={stone.image || "/placeholder.svg"}
                  alt={stone.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{stone.name}</h3>
                  <span className="text-sm">₹{stone.price.toFixed(2)}/ct</span>
                </div>
                <div className="flex items-center justify-between">
                  <label className="relative inline-flex items-center cursor-pointer mr-1">
                    <input
                      type="checkbox"
                      checked={activeStatus[stone._id]}
                      onChange={() => handleToggleClick(stone._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#8BAD3F] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8BAD3F]"></div>
                  </label>
                  <button
                    className="px-3 py-1 bg-[#8BAD3F] text-white text-sm rounded-md hover:bg-[#7A9A35]"
                    onClick={() => handleEditDetails(stone._id)}
                  >
                    Edit details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stones.map((stone) => (
                <tr key={stone._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={stone.image || "/placeholder.svg"}
                        alt={stone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{stone.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{stone.price.toFixed(2)}/ct
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeStatus[stone.id]}
                        onChange={() => handleToggleClick(stone._id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#8BAD3F] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8BAD3F]"></div>
                    </label>
                    <button
                      className="px-3 py-1 bg-[#8BAD3F] text-white text-sm rounded-md hover:bg-[#7A9A35]"
                      onClick={() => handleEditDetails(stone._id)}
                    >
                      Edit details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add new stone button */}
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
        Add new stone
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">
              {nextStatus ? "Activate" : "Deactivate"} this stone?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to {nextStatus ? "activate" : "deactivate"}{" "}
              this stone?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-[#8BAD3F] text-white px-4 py-2 rounded-md hover:bg-[#7A9A35]"
              >
                OK
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStoneId ? (
        <StoneDetailsModal
          stoneId={selectedStoneId}
          onClose={() => setSelectedStoneId(null)}
          onEditClick={(stone) => {
            setEditingStone(stone); // 👈 this opens the edit modal
            setSelectedStoneId(null);
          }}
        />
      ) : null}

      {editingStone ? (
        <StoneEditModal
          stone={editingStone}
          onClose={() => setEditingStone(null)}
          setStoneState={setStoneState}
          onSave={() => {
            setShowEditModal(null);
            // setSelectedStoneId(null);
            // optionally re-fetch stones
          }}
        />
      ) : null}
    </div>
  );
};

export default StoneSection;
