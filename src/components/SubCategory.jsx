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
