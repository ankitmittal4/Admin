import React, { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };
  return (
    <div className="fixed top-16 left-0 w-1/5 bg-gray-800 p-5 h-[calc(100vh-4rem)] ">
      <ul className="text-2xl">
        <li className="mb-3">
          <Link
            to="/dashboard"
            className="block p-1 px-3 rounded-lg hover:bg-gray-600"
          >
            Users
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/dashboard/orders"
            className="block p-1 px-3 rounded-lg hover:bg-gray-600"
          >
            Orders
          </Link>
        </li>
        <li className="mb-3">
          <div
            className="block p-1 px-3 rounded-lg hover:bg-gray-600 cursor-pointer flex justify-between items-center"
            onClick={toggleProductsDropdown}
          >
            <span>Products</span>
            <span
              className={`transform ${
                isProductsDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </div>
          {isProductsDropdownOpen && (
            <ul className="ml-5 mt-2">
              <li className="mb-2">
                <Link
                  to="/dashboard/products"
                  className="block p-1 px-3 rounded-lg hover:bg-gray-600"
                >
                  All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/products/category"
                  className="block p-1 px-3 rounded-lg hover:bg-gray-600"
                >
                  Category
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-3">
          <Link
            to="/dashboard/sellers"
            className="block p-1 px-3 rounded-lg hover:bg-gray-600"
          >
            Sellers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
