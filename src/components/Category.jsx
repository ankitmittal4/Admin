import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import Constants from "../Constants";
const { API_URL } = Constants;
const Category = () => {
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    setLoading(true);
    try {
      let data = JSON.stringify({
        query: `mutation AdminListCategory($page: Int, $limit: Int) {
          adminListCategory(page: $page, limit: $limit) {
            message
            category {
              id
              title
              createdAt
              updatedAt
              productSubCategories {
                id
              }
            }
          }
        }`,
        variables: {
          page: 1,
          limit: 1000,
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: API_URL,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      // console.log("Request: ", response.data.data);

      const category = response.data.data.adminListCategory.category;

      if (category.length) {
        // console.log("Category: ", category);
        setCategories(category);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubCategory = (categoryId) => {
    navigate(`sub-category/${categoryId}`);
  };
  const deleteCategory = (categoryId) => {
    //delete api
  };
  const editCategory = (categoryId) => {
    //edit api
  };

  //FIXME: Add category code

  const [showPopup, setShowPopup] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [duplicateCategory, setDuplicateCategory] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
    setCategoryName("");
    setDuplicateCategory(false);
  };
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = JSON.stringify({
        query: `mutation AdminAddCategory ($name: String!){
          adminAddCategory(name: $name) {
            message
            category {
              id
              title
              createdAt
              updatedAt
            }
          }
        }`,
        variables: {
          name: categoryName,
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: API_URL,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log("Request: ", response.data.data);

      const addedCategory = response.data.data.adminAddCategory.category;
      if (addedCategory) {
        console.log("Added Category: ", addedCategory);
        setCategories((prevCategories) => [...prevCategories, addedCategory]);
        setLoading(false);
        setDuplicateCategory(false);
        setShowPopup(false);
      } else {
        setLoading(false);
        setDuplicateCategory(true);
        setTimeout(() => {
          setDuplicateCategory(false);
        }, 400);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const setUpdateOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-bold mb-0">All Category</h2>
        <button
          className="bg-white hover:bg-gray-400 text-gray-700 px-4 py-2 font-bold text-lg rounded-md"
          onClick={handleOpenPopup}
        >
          Add Category
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-300 p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Add Category
            </h2>
            <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              onKeyDown={(e) => setUpdateOnEnter(e)}
              placeholder="Enter Category"
              className="border border-gray-500 p-2 rounded-md w-full mb-1 text-gray-800 bg-gray-200 outline-none"
            />
            <div className="h-6 flex items-center">
              {duplicateCategory && (
                <div className="text-red-500">Category already exists.</div>
              )}
            </div>
            <div className="mt-3 flex justify-between">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-md mr-2"
              >
                {loading ? "Adding..." : "Add"}
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 w-full rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr className="text-left ">
                  <th className="py-2 text-xl px-4 border-b">Name</th>
                  <th className="py-2 text-xl border-b text-center w-96">
                    Sub-Category
                  </th>
                  <th className="py-2 text-xl border-b w-28 text-center">
                    Edit
                  </th>
                  <th className="py-2 text-xl border-b w-28 text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="text-lg hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSubCategory(category.id)}
                  >
                    <td className="py-2 px-4">{category.title}</td>
                    <td className="py-2 text-center">
                      {category.productSubCategories.length}
                    </td>
                    <td
                      className="py-2 text-center hover:bg-blue-600"
                      onClick={() => editCategory(category.id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </td>
                    <td
                      className="py-2 text-center hover:bg-red-500"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
