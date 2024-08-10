import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Constants from "../Constants";
const { API_URL } = Constants;

const SubCategory = () => {
  const token = localStorage.getItem("token");
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  // console.log("categoryId: ", typeof Number(categoryId));

  const fetchSubCategory = async () => {
    setLoading(true);
    try {
      let data = JSON.stringify({
        query: `mutation AdminListSubCategory($categoryId1: Int!) {
          adminListSubCategory(categoryId: $categoryId1) {
            message
            subCategory {
              id
              title
              createdAt
              updatedAt
            }
          }
        }`,
        variables: {
          categoryId1: Number(categoryId),
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

      const subCategory = response.data.data.adminListSubCategory.subCategory;
      // const category = response.data.data.adminListSubCategory.categoryName;
      if (subCategory.length) {
        // console.log("Sub-Category: ", subCategory);
        setSubCategories(subCategory);
        // setCategoryName(category);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchSubCategory();
  }, []);

  //FIXME: Add sub-category code

  const [showPopup, setShowPopup] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [duplicateSubCategory, setDuplicateSubCategory] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
    setSubCategoryName("");
    setDuplicateSubCategory(false);
  };
  const handleInputChange = (e) => {
    setSubCategoryName(e.target.value);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let data = JSON.stringify({
        query: `mutation AdminAddSubCategory($categoryId: Int!, $name: String!) {
                  adminAddSubCategory(categoryId: $categoryId, name: $name) {
                    message
                    subCategory {
                      id
                      title
                      createdAt
                      updatedAt
                    }
                  }
                }`,
        variables: {
          categoryId: Number(categoryId),
          name: subCategoryName,
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

      const addedSubCategory =
        response.data.data.adminAddSubCategory.subCategory;
      if (addedSubCategory) {
        console.log("Added Sub-Category: ", addedSubCategory);
        setSubCategories((prevSubCategories) => [
          ...prevSubCategories,
          addedSubCategory,
        ]);
        setLoading(false);
        setDuplicateSubCategory(false);
        setShowPopup(false);
      } else {
        setLoading(false);
        setDuplicateSubCategory(true);
        setTimeout(() => {
          setDuplicateSubCategory(false);
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
        <h2 className="text-2xl font-bold mb-0">
          Sub Categories of {categoryName}
        </h2>
        <button
          className="bg-white hover:bg-gray-400 text-gray-700 px-4 py-2 font-bold text-lg rounded-md"
          onClick={handleOpenPopup}
        >
          Add Sub-Category
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-300 p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Add Sub-Category
            </h2>
            <input
              type="text"
              value={subCategoryName}
              onChange={handleInputChange}
              onKeyDown={(e) => setUpdateOnEnter(e)}
              placeholder="Enter Sub-Category"
              className="border border-gray-500 p-2 rounded-md w-full mb-1 text-gray-800 bg-gray-200 outline-none"
            />
            <div className="h-6 flex items-center">
              {duplicateSubCategory && (
                <div className="text-red-500">Sub-Category already exists.</div>
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
                  <th className="py-2 text-xl border-b">Sub-Category</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((subCategory) => (
                  <tr
                    key={subCategory.id}
                    className="text-lg hover:bg-gray-600 cursor-pointer"
                    // onClick={() => handleSubCategory(subCategory.id)}
                  >
                    <td className="py-2 px-4">{subCategory.title}</td>
                    <td className="py-2">{subCategory.createdAt}</td>
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
export default SubCategory;

//array of all category : res.data
// const totalCategory = res.data.length;
// const startIndex = (page - 1) * limit;
// const endIndex = startIndex + limit;
// const paginateCategory = res.data.slice(startIndex, endIndex);
// setTotalPages(Math.ceil(totalCategory / limit));
// setLoading(false);

/* <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 ml-10 mb-8 mt-6 bg-gray-600 rounded disabled:opacity-50 "
              >
                Previous
              </button>
              <span className="text-black">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mr-10 mb-8 mt-6 bg-gray-600 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div> */
