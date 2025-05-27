import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { updateStone } from "../api/stoneApi";

const StoneEditModal = ({ stone, onClose, onSave, setStoneState }) => {
  const [formData, setFormData] = useState(stone);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataToUpload = new FormData();
      formDataToUpload.append("image", file);

      try {
        const response = await fetch("http://localhost:5000/api/uploadImage", {
          method: "POST",
          body: formDataToUpload,
        });

        const data = await response.json();
        if (response.ok) {
          setFormData((org) => ({ ...org, image: data.url }));

          setPreviewUrl(data.url); // this is the Cloudinary URL
        } else {
          console.error("Upload failed:", data.error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newStone = {
        name: formData.name,
        unit: formData.unit,
        size: formData.size,
        color: formData.color,
        piece: formData.piece,
        price: Number.parseFloat(formData.price),
        weight: formData.weight,
        image: formData.image || "/placeholder.svg?height=150&width=150",
      };
      const res = await updateStone(stone._id, newStone);

      setStoneState(res);
    } catch (error) {
      console.error("Error creating stone:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-xl relative">
        <button
          className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="relative bg-gray-100 w-full h-40 flex items-center justify-center rounded">
            <label
              htmlFor="imageUpload"
              className="absolute flex items-center gap-1 bg-[#4C5C1A] text-white px-3 py-1 rounded-md cursor-pointer"
            >
              <FiUpload size={18} />
              Upload
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="stone"
                className="w-full h-full object-cover rounded"
              />
            )}
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <label className="w-32 text-sm font-medium">Stone's name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-gray-100 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label className="w-32 text-sm font-medium">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="bg-gray-100 rounded px-3 py-2 w-full"
              >
                <option value="RATTI">RATTI</option>
                <option value="CARAT">CARAT</option>
                <option value="GRAM">GRAM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block text-sm">Size</label>
            <input
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              className="bg-gray-100 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Color</label>
            <input
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="bg-gray-100 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Piece</label>
            <input
              type="number"
              value={formData.piece}
              onChange={(e) =>
                setFormData({ ...formData, piece: parseInt(e.target.value) })
              }
              className="bg-gray-100 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="bg-gray-100 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Weight</label>
            <input
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              className="bg-gray-100 rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-[#8BAD3F] text-white px-6 py-2 rounded hover:bg-[#7A9A35]"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoneEditModal;
