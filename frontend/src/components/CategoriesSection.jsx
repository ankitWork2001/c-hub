import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/categories/`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setCategory(response?.data?.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    makeRequest();
  }, []);

  return (
    <section className="w-full px-4 py-12 bg-white font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">🎯 Categories</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {category.map((value, index) => (
            <CategoryCard
              key={index}
              image={value.image}
              name={value.name}
              totalCoupons={value.totalCoupons}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
