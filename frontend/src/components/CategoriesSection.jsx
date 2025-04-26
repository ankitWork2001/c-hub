import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/categories/`,
      headers: {
        "Content-Type": "application/json",
        
      },
    };
    async function makeRequest() {
      let response = await axios.request(config);
      // console.log(response.data.categories);
      setCategory(response?.data?.categories);
    }

    makeRequest();
  }, []);

  return (
    <>
    <div className="w-[90vw] m-auto mt-5 flex flex-col gap-y-5 bg-white rounded-lg">
      <h1 className="text-4xl">Categories</h1>
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {category?.map((value,index)=>{
          return <CategoryCard key={index} image={value.image} name={value.name} totalCoupons={value.totalCoupons} />
        })}
      </div>
      </div>
    </>
  );
};

export default CategoriesSection;
