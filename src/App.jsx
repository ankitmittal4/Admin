import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Sellers from "./components/Sellers";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="bg-gray-900 h-screen">
      <div className="flex flex-col bg-gray-900 text-white">
        <Navbar />
        <div className="flex flex-1 h-screen">
          <Sidebar />
          <div className="flex-1 p-10 overflow-auto  ">
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sellers" element={<Sellers />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
