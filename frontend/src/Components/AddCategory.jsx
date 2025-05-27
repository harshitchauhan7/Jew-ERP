import { useState } from "react";

const AddCategoryModal = ({ onClose, setCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Metal",
    active: true,
    image: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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
          console.log(data);
          setFormData((org) => ({ ...org, image: data.url }));
          setPreview(data.url); // this is the Cloudinary URL
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

    const data = {
      image: formData.image,
      type: formData.type,
      active: formData.active,

      name: formData.name,
    };

    try {
      const res = await fetch("http://localhost:5000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const rers = await res.json();

      if (res.ok) {
        setCategory(rers);
        onClose();
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Add category error:", err);
      alert("An error occurred while adding the category.");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Category</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-4">
            <div className="relative w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-opacity-10 hover:bg-opacity-20 transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center text-green-900 text-sm font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3M12 4v4"
                        />
                      </svg>
                      Upload
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Category Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Category name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Category Type */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Jewellery type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Metal">Metal</option>
              <option value="Artificial">Artificial</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 rounded mt-2"
          >
            Add category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
