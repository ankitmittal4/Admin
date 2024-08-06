import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Users from "./Users";
import Orders from "./Orders";
import Products from "./Products";
import Sellers from "./Sellers";
import Category from "./Category";
import SubCategory from "./SubCategory";
const DashboardRoutes = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <div className="flex-1 ml-[20%] p-10 overflow-auto">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/category" element={<Category />} />
            <Route
              path="/products/category/sub-category/:categoryId"
              element={<SubCategory />}
            />
            <Route path="/sellers" element={<Sellers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoutes;
