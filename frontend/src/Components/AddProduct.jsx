"use client"

import { useState } from "react"

const AddProductModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    weight: 0,
    stock: 0,
    type: "Metal",
    active: true,
    materials: {
      metal: "Metal",
      stone: "Stone",
      bronze: "Bronze 1",
      pearl: "Pearl",
      bronzeCode: "BR95",
    },
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) || 0 : value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(formData)
  }

  return ( 
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Product Name
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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                Weight (gm)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                Type
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
          </div>

          <div className="mb-4">
            <h3 className="text-gray-700 text-sm font-bold mb-2">Materials</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.metal">
                  Metal
                </label>
                <input
                  type="text"
                  id="materials.metal"
                  name="materials.metal"
                  value={formData.materials.metal}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.stone">
                  Stone
                </label>
                <input
                  type="text"
                  id="materials.stone"
                  name="materials.stone"
                  value={formData.materials.stone}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.bronze">
                  Bronze
                </label>
                <input
                  type="text"
                  id="materials.bronze"
                  name="materials.bronze"
                  value={formData.materials.bronze}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.bronzeCode">
                  Bronze Code
                </label>
                <input
                  type="text"
                  id="materials.bronzeCode"
                  name="materials.bronzeCode"
                  value={formData.materials.bronzeCode}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs mb-1" htmlFor="materials.pearl">
                  Pearl
                </label>
                <input
                  type="text"
                  id="materials.pearl"
                  name="materials.pearl"
                  value={formData.materials.pearl}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700 text-sm font-bold" htmlFor="active">
              Active
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
