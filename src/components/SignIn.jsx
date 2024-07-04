import React from "react";

const LoginForm = () => {
  return (
    <div className=" flex items-center justify-center bg-white">
      <div className="  rounded  w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-10 mt-16 text-center text-black tracking-wider">
          Login
        </h2>
        <form>
          <div className="mb-6">
            <label
              className="block text-black text-1xl font-bold mb-2 tracking-wider"
              htmlFor="username"
            >
              Email Address
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-black border rounded w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-black focus:shadow-outline border-black text-sm tracking-wide"
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="mb-8">
            <label
              className="block text-black text-1xl font-bold mb-2 tracking-wider"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2.5 px-4 text-gray-700 mb-3 leading-tight focus:outline-black focus:shadow-outline border-black tracking-wide"
              placeholder="**********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full tracking-wide "
              type="button"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
