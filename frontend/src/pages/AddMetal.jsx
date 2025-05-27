
import { useState } from "react";
import { createMetal } from "../api/metalApi";


const AddMetalModal = ({ onClose, onAddMetal }) => {
  const [formData, setFormData] = useState({
    name: "",

    unit: "",
    standardPurity: "",
    standardPurityPrice: "",
    image: null,
  });
  const [variants, setVariants] = useState([
    { name: "", purity: "", price: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          setPreviewUrl(data.url); // this is the Cloudinary URL
        } else {
          console.error("Upload failed:", data.error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...variants];

    // Convert to number if field is 'purity' or 'price'
    updated[index][name] =
      name === "purity" || name === "price" ? Number(value) : value;

    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", purity: 0, price: 0 }]);
  };
  const removeVariant = (indexToRemove) => {
    setVariants((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a new metal object

      const newMetal = {
        name: formData.name,
        unit: formData.unit,
        standardPurity: Number(formData.standardPurity),
        standardPurityPrice: Number(formData.standardPurityPrice),
        varients: variants,
        image:
          previewUrl || "https://avatars.githubusercontent.com/u/129311377?v=4",
      };

      let finalArrayOfMetals = await createMetal(newMetal).catch((a) => null);
      // Add the new metal
      console.log(finalArrayOfMetals);
      if (finalArrayOfMetals) {
        onAddMetal(finalArrayOfMetals);
      }

      onClose();
    } catch (error) {
      console.error("Error creating metal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Harshit chauhan

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center z-50">

      <div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Add New Metal</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            {/* <X className="w-5 h-5" /> */}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className=" flex flex-col gap-6">
            <div className="flex items-start space-x-4">
              <div className="relative w-40 h-30 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                {/* Image Preview */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm text-center">
                    No image
                  </span>
                )}

                {/* Center Upload Icon */}
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 flex items-center justify-center bg-opacity-30 hover:bg-opacity-40 transition duration-200 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black font-extrabold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0-6l3 3m-3-3l-3 3m3-10v7"
                    />
                  </svg>
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className=" flex flex-col gap-8">
                <div className=" flex ">
                  <label className="block text-sm font-medium mb-1 w-40 ">
                    Metal's name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-50 px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex">
                  <label className="block text-sm font-medium mb-1 w-40">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-50 px-3 py-2 border rounded-md"
                  >
                    <option value="">Select unit</option>
                    <option value="gm">gm</option>
                    <option value="kg">kg</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>
            </div>

            <div className=" flex ">
              <div className="flex ">
                <label className="block text-sm font-medium mb-1 w-60">
                  Standard purity %
                </label>
                <input
                  type="number"
                  name="standardPurity"
                  value={formData.standardPurity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className=" flex ">
                <label className="block text-sm font-medium mb-1">
                  Standard purity price
                </label>
                <input
                  type="number"
                  name="standardPurityPrice"
                  value={formData.standardPurityPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Add variants
            </label>
            <div className="space-y-2">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-2 items-center"
                >
                  <input
                    type="text"
                    name="name"
                    value={variant.name}
                    onChange={(e) => handleVariantChange(index, e)}
                    placeholder="Variant's name"
                    className="px-3 py-2 border rounded-md"
                  />
                  <input
                    type="number"
                    name="purity"
                    value={variant.purity}
                    onChange={(e) => handleVariantChange(index, e)}
                    placeholder="Purity %"
                    className="px-3 py-2 border rounded-md"
                  />
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      name="price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, e)}
                      placeholder="Price"
                      className="px-3 py-2 border rounded-md"
                    />
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addVariant}
                className="flex items-center text-sm text-green-700 hover:text-green-900"
              >
                {/* <PlusCircle className="w-5 h-5 mr-1" /> Add variant */}
                Add Variant
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8BAD3F] text-white rounded-md hover:bg-[#7A9A35] disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add metal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMetalModal;



// import { useState } from "react"

// const AddMetalModal = ({ onClose, onAddMetal }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     image: null,
//     description: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [previewUrl, setPreviewUrl] = useState(null)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setFormData({
//         ...formData,
//         image: file,
//       })

//       // Create preview URL
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       // In a real app, you would make an API call here
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Create a new metal object
//       const newMetal = {
//         name: formData.name,
//         price: Number.parseFloat(formData.price),
//         image: previewUrl || "/placeholder.svg?height=150&width=150",
//         description: formData.description,
//       }

//       // Add the new metal
//       onAddMetal(newMetal)

//       // Close the modal
//       onClose()
//     } catch (error) {
//       console.error("Error creating metal:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0m bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-medium">Add New Metal</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Metal Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8BAD3F]"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Price per gram (₹)</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8BAD3F]"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Metal Image</label>
//               <div className="flex items-center space-x-4">
//                 <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
//                   {previewUrl ? (
//                     <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <span className="text-gray-400 text-sm text-center">No image selected</span>
//                   )}
//                 </div>
//                 <div>
//                   <input
//                     type="file"
//                     id="image-upload"
//                     name="image"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md cursor-pointer hover:bg-gray-300"
//                   >
//                     Choose Image
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="3"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8BAD3F]"
//               ></textarea>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#8BAD3F] text-white rounded-md hover:bg-[#7A9A35] disabled:opacity-50"
//               disabled={isLoading}
//             >
//               {isLoading ? "Adding..." : "Add Metal"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddMetalModal
