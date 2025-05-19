"use client"

import { useState } from "react"

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    gender: product.gender || "",
    price: product.price || 0,
    stock: product.stock || 0,
    weight: product.weight || 0,
    type: product.type || "",
    category: product.category || "",
    metals: product.metals || [],
    stones: product.stones || [],
    huid: product.huid || "",
    hsn: product.hsn || "",
    makingCharges: product.makingCharges || 0,
    image: product.image || null,
  })

  const [metalInputs, setMetalInputs] = useState(product.metals || [{ metal: "", variant: "", weight: 0 }])
  const [stoneInputs, setStoneInputs] = useState(product.stones || [{ stone: "", quantity: 0, weight: 0, price: 0 }])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddMetal = () => {
    setMetalInputs([...metalInputs, { metal: "", variant: "", weight: 0 }])
  }

  const handleAddStone = () => {
    setStoneInputs([...stoneInputs, { stone: "", quantity: 0, weight: 0, price: 0 }])
  }

  const handleMetalChange = (index, field, value) => {
    const updated = [...metalInputs]
    updated[index][field] = value
    setMetalInputs(updated)
    setFormData({ ...formData, metals: updated })
  }

  const handleStoneChange = (index, field, value) => {
    const updated = [...stoneInputs]
    updated[index][field] = value
    setStoneInputs(updated)
    setFormData({ ...formData, stones: updated })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center relative">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="object-cover w-full h-full rounded" />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input" />
              <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="input" />
            <input name="stock" type="number" placeholder="In Stock" value={formData.stock} onChange={handleChange} className="input" />
            <input name="weight" type="number" placeholder="Weight" value={formData.weight} onChange={handleChange} className="input" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <select name="type" value={formData.type} onChange={handleChange} className="input">
              <option value="">Type</option>
              <option value="Ring">Ring</option>
              <option value="Necklace">Necklace</option>
            </select>
            <select name="category" value={formData.category} onChange={handleChange} className="input">
              <option value="">Category</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Select Metal</label>
            {metalInputs.map((item, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4 mb-2">
                <input
                  value={item.metal}
                  onChange={(e) => handleMetalChange(idx, "metal", e.target.value)}
                  className="input"
                  placeholder="Metal"
                />
                <input
                  value={item.variant}
                  onChange={(e) => handleMetalChange(idx, "variant", e.target.value)}
                  className="input"
                  placeholder="Variant"
                />
                <input
                  type="number"
                  value={item.weight}
                  onChange={(e) => handleMetalChange(idx, "weight", e.target.value)}
                  className="input"
                  placeholder="Weight"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddMetal} className="text-sm text-green-600">+ Add Metal</button>
          </div>

          <div>
            <label className="font-medium">Select Stone</label>
            {stoneInputs.map((item, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 mb-2">
                <input
                  value={item.stone}
                  onChange={(e) => handleStoneChange(idx, "stone", e.target.value)}
                  className="input"
                  placeholder="Stone"
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleStoneChange(idx, "quantity", e.target.value)}
                  className="input"
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  value={item.weight}
                  onChange={(e) => handleStoneChange(idx, "weight", e.target.value)}
                  className="input"
                  placeholder="Weight"
                />
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleStoneChange(idx, "price", e.target.value)}
                  className="input"
                  placeholder="Price"
                />
              </div>
            ))}
            <button type="button" onClick={handleAddStone} className="text-sm text-green-600">+ Add Stone</button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input name="huid" placeholder="HUID number" value={formData.huid} onChange={handleChange} className="input" />
            <input name="hsn" placeholder="HSN number" value={formData.hsn} onChange={handleChange} className="input" />
            <input name="makingCharges" placeholder="Making charges" type="number" value={formData.makingCharges} onChange={handleChange} className="input" />
          </div>

          <div className="text-center">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal








// "use client"

// import { useState } from "react"

// const EditProductModal = ({ product, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: product.name,
//     price: product.price,
//     weight: product.weight,
//     stock: product.stock,
//     type: product.type,
//     active: product.active,
//     materials: {
//       metal: product.materials.metal,
//       stone: product.materials.stone,
//       bronze: product.materials.bronze,
//       pearl: product.materials.pearl,
//       bronzeCode: product.materials.bronzeCode,
//     },
//   })

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target

//     if (name.includes(".")) {
//       const [parent, child] = name.split(".")
//       setFormData({
//         ...formData,
//         [parent]: {
//           ...formData[parent],
//           [child]: value,
//         },
//       })
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) || 0 : value,
//       })
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSave(formData)
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Edit Product</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Product Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
//                 Price (₹)
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 id="price"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
//                 Weight (gm)
//               </label>
//               <input
//                 type="number"
//                 id="weight"
//                 name="weight"
//                 value={formData.weight}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
//                 Stock
//               </label>
//               <input
//                 type="number"
//                 id="stock"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
//                 Type
//               </label>
//               <select
//                 id="type"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               >
//                 <option value="Metal">Metal</option>
//                 <option value="Artificial">Artificial</option>
//               </select>
//             </div>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-gray-700 text-sm font-bold mb-2">Materials</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.metal">
//                   Metal
//                 </label>
//                 <input
//                   type="text"
//                   id="materials.metal"
//                   name="materials.metal"
//                   value={formData.materials.metal}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.stone">
//                   Stone
//                 </label>
//                 <input
//                   type="text"
//                   id="materials.stone"
//                   name="materials.stone"
//                   value={formData.materials.stone}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.bronze">
//                   Bronze
//                 </label>
//                 <input
//                   type="text"
//                   id="materials.bronze"
//                   name="materials.bronze"
//                   value={formData.materials.bronze}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.bronzeCode">
//                   Bronze Code
//                 </label>
//                 <input
//                   type="text"
//                   id="materials.bronzeCode"
//                   name="materials.bronzeCode"
//                   value={formData.materials.bronzeCode}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.pearl">
//                   Pearl
//                 </label>
//                 <input
//                   type="text"
//                   id="materials.pearl"
//                   name="materials.pearl"
//                   value={formData.materials.pearl}
//                   onChange={handleChange}
//                   className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="active"
//               name="active"
//               checked={formData.active}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-gray-700 text-sm font-bold" htmlFor="active">
//               Active
//             </label>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EditProductModal
