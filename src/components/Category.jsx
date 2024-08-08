import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
            }
          }
        }`,
        variables: {
          page: 1,
          limit: 10,
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
        console.log("Category: ", category);
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
  return (
    <>
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-bold mb-0">All Category</h2>
        <button className="bg-white hover:bg-gray-400 text-gray-700 px-4 py-2 font-bold text-lg rounded-md">
          Add Category
        </button>
      </div>
      <div className="bg-gray-800 w-full rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr className="text-left ">
                  <th className="py-2 text-xl px-4 border-b">Name</th>
                  <th className="py-2 text-xl border-b">Sub-Category</th>
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
                    <td className="py-2">{category.createdAt}</td>
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
