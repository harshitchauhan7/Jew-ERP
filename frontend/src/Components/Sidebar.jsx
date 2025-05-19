"use client"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  ArchiveIcon,
  UserGroupIcon,
  UserIcon,
  DocumentTextIcon,
  LogoutIcon,
} from "./Icons"

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: "/home", name: "Dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { path: "/metal-management", name: "Metal Management", icon: <CubeIcon className="w-5 h-5" /> },
    { path: "/category-management", name: "Category Management", icon: <TagIcon className="w-5 h-5" /> },
    { path: "/product-management", name: "Product Management", icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { path: "/sales-management", name: "Sales Management", icon: <ChartBarIcon className="w-5 h-5" /> },
    { path: "/stocks-management", name: "Stocks Management", icon: <ArchiveIcon className="w-5 h-5" /> },
    { path: "/customer-management", name: "Customer Management", icon: <UserGroupIcon className="w-5 h-5" /> },
    { path: "/staff-management", name: "Staff Management", icon: <UserIcon className="w-5 h-5" /> },
    { path: "/invoice-management", name: "Invoice Management", icon: <DocumentTextIcon className="w-5 h-5" /> },
  ]


   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logout successful');
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }
  return (
    <div className="bg-[#8AAE4A] text-white w-70 flex-shrink-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.path ? "bg-white text-green-700" : "hover:bg-white hover:text-green-700"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
  <button
    className="flex items-center px-4 py-3 w-full text-left rounded-md hover:bg-white hover:text-green-700 transition-colors"
    onClick={handleLogout}
  >
    <LogoutIcon className="w-5 h-5" />
    <span className="ml-3">Logout</span>
  </button>
</div>

    </div>
  )
}

export default Sidebar
