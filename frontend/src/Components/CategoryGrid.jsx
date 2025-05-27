import { useState } from "react";
import EditCategoryModal from "./EditCategory";

const CategoryGrid = ({
  categories,
  viewMode,
  onToggleActive,
  onEditCategory,
}) => {
  const [editingCategory, setEditingCategory] = useState(null);

  const handleEditClick = (category) => {
    setEditingCategory(category);
  };

  const handleEditSave = (updatedCategory) => {
    onEditCategory(updatedCategory);
    setEditingCategory(null);
  };

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-200 rounded-md overflow-hidden"
            >
              <div className="h-32 bg-gray-300">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{category.name}</div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id={`toggle-${category.id}`}
                      checked={category.active}
                      onChange={() => onToggleActive(category.id)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`toggle-${category.id}`}
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                        category.active ? "bg-[#8AAE4A]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                          category.active ? "transform translate-x-4" : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Jewellery type:{" "}
                  <span className="font-medium">{category.type}</span>
                </div>
                <button
                  onClick={() => handleEditClick(category)}
                  className="w-full py-1 text-white font-semibold bg-[#8AAE4A] hover:bg-gray-400 rounded text-md"
                >
                  Edit details
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingCategory && (
          <EditCategoryModal
            category={editingCategory}
            onClose={() => setEditingCategory(null)}
            onSave={handleEditSave}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="overflow-x-auto">
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
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 bg-gray-300 rounded">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{category.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        id={`toggle-list-${category.id}`}
                        checked={category.active}
                        onChange={() => onToggleActive(category.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`toggle-list-${category.id}`}
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                          category.active ? "bg-green-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                            category.active ? "transform translate-x-4" : ""
                          }`}
                        ></span>
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Edit details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingCategory && (
          <EditCategoryModal
            category={editingCategory}
            onClose={() => setEditingCategory(null)}
            onSave={handleEditSave}
          />
        )}
      </>
    );
  }
};

export default CategoryGrid;
