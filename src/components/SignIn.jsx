import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/adminSlice";
import { setActiveUser } from "../features/adminSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Constants from "../Constants";
const { API_URL } = Constants;
// console.log(API_URL);
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loginError, setLoginError] = useState("Account Not Found!!!");

  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Email:", email);
    // console.log("Password:", password);

    try {
      let data = {
        email: email,
        password: password,
      };

      const response = await axios.post(`${API_URL}/admin/login`, data);
      console.log("Request: ", response.data.data);

      const token = response.data.data.accessToken;
      // console.log(token);
      if (token !== null) {
        // const username = response.data.data.adminLogin.admin.name;
        console.log("Login successful", response.data.data.admin);
        setSuccessMsg(true);
        setErrorMsg(false);

        dispatch(setToken(token));
        localStorage.setItem("token", token);

        dispatch(setActiveUser(email));
        localStorage.setItem("username", email);

        setShowMessage(true);
        setShowMessage(false);
        navigate("/dashboard");
        setLoading(false);
      } else {
        setLoading(false);
        setErrorMsg(true);
        setSuccessMsg(false);
        setLoginError(response.data.message);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-white text-4xl"
          />
        </div>
      )}

      {/* Animation message */}
      {showMessage && (
        <div className="fixed top-0 right-0 mx-auto w-full max-w-sm mt-4 z-10 flex justify-center max-h-20">
          {successMsg ? (
            <p className="text-1xl font-medium text-white sm-text-center mt-4 animate-slide-in-right">
              <span className="px-4 py-3 rounded bg-green-500 shadow-lg  shadow-green-500/50">
                Login Successful
              </span>
              <Link
                to="/dashboard"
                className="font-medium text-blue-600 hover:text-blue-500"
              ></Link>
            </p>
          ) : errorMsg ? (
            <p className="text-1xl font-medium text-white sm-text-center mt-4 animate-slide-in-right ">
              <span className="bg-red-500 px-12 py-3 rounded shadow-lg  shadow-red-500/50 ">
                {loginError}
              </span>
            </p>
          ) : (
            <p></p>
          )}
        </div>
      )}

      <div className=" flex items-center justify-center bg-white">
        <div className="  rounded  w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-10 mt-16 text-center text-black tracking-wider">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={handleEmailChange}
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
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full tracking-wide "
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
