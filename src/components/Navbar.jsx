import React from "react";

const Navbar = () => (
  <div className="">
    <div className="w-full bg-gray-900 p-3 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Sriina</h1>
      </div>
      <div className="flex-1 mx-20">
        <input
          type="text"
          placeholder="Search..."
          className="w-35 p-1 px-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none"
        />
      </div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&s"
          alt="Admin Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
    <hr />
  </div>
);

export default Navbar;