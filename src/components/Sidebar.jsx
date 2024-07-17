import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-1/5 bg-gray-800 p-5 min-h-screen">
    {/* <h2 className="text-2xl font-bold mb-5">Admin Panel</h2> */}
    <ul className="text-2xl">
      <li className="mb-3">
        <Link to="/" className="block p-1 px-3 rounded-lg hover:bg-gray-600">
          Users
        </Link>
      </li>
      <li className="mb-3">
        <Link
          to="/orders"
          className="block p-1 px-3 rounded-lg hover:bg-gray-600"
        >
          Orders
        </Link>
      </li>
      <li className="mb-3">
        <Link
          to="/products"
          className="block p-1 px-3 rounded-lg hover:bg-gray-600"
        >
          Products
        </Link>
      </li>
      <li className="mb-3">
        <Link
          to="/sellers"
          className="block p-1 px-3 rounded-lg hover:bg-gray-600"
        >
          Sellers
        </Link>
      </li>
    </ul>
  </div>
);
export default Sidebar;
