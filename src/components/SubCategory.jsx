import React from "react";
import { useParams } from "react-router-dom";
const SubCategory = () => {
  const { categoryId } = useParams();
  console.log(categoryId);
  return (
    <>
      <h1>SubCategory list</h1>
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
