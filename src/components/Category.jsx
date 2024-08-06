import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import dummyUsers from "../dummyUsers";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const navigate = useNavigate();

  const fetchCategory = async (page) => {
    setLoading(true);
    const res = await axios.get();
    //array of all category : res.data
    const totalCategory = res.data.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginateCategory = res.data.slice(startIndex, endIndex);
    setCategories(paginateCategory);
    setTotalPages(Math.ceil(totalCategory / limit));
    setLoading(false);
  };
  useEffect(() => {
    fetchCategory(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSubCategory = (categoryId) => {
    navigate(`sub-category/${categoryId}`);
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-5">All Category</h2>
      <div className="bg-gray-800 w-full rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr className="text-left ">
                  <th className="py-2 text-xl px-4 border-b">Name</th>
                  <th className="py-2 text-xl border-b">Email</th>
                  <th className="py-2 text-xl border-b">Added On</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="text-lg hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleSubCategory(category.id)}
                  >
                    <td className="py-2 px-4">{category.name}</td>
                    <td className="py-2">{category.email}</td>
                    <td className="py-2">
                      {new Date(category.addedOn).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-5">
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
