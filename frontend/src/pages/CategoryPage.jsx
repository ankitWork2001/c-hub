import React, { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "../components/CouponCard";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCategoryName } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import { FaFilter } from 'react-icons/fa';
import SeoTags from "../components/SeoTags";

const CategoryPage = () => {
  const [category, setCategory] = useState();
  const catogoryId = useSelector((state) => state.category.categoryId);
  const categoryName = useSelector((state) => state.category.categoryName);
  const [categoryData, setCategoryData] = useState([]);
  const [formdata, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/coupons`,
      headers: {
        "Content-Type": "application/json",
        
      },
    };
    async function makeRequest() {
      let response = await axios.request(config);
      let data = response.data;
      if (catogoryId != null) {
        setCategory(
          data.filter((value) => {
            return value?.category?._id == catogoryId;
          })
        );
      } else {
        setCategory(data);
      }
    }

    makeRequest();
  }, [catogoryId]);
  useEffect(() => {
    fetchCategoryData();
  }, []);
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}api/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCategoryData(response.data.categories);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(formdata.categoryName=="All Categories"){
      formdata.categoryId=null;
    }
    console.log("Form submitted:", formdata);
    dispatch(setCategoryId(formdata.categoryId));
    dispatch(setCategoryName(formdata.categoryName));
    navigate("/category");
  };

  return (
    <div className="container mx-auto mt-[2rem] px-2 sm:px-4 max-w-[1440px]">
      <div className="relative mb-4 md:mb-6">
        {category?.length > 0 && (
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">
            {categoryName} : Best Deals
          </h1>
        )}

        {/* Filter Toggle Button - Hidden on large screens */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="lg:hidden absolute right-0 top-0 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
          aria-label="Toggle Filters"
        >
          <FaFilter className={`w-5 h-5 transition-transform duration-200 ${
            showFilter ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Filter Section */}
        <div
          className={`transform transition-all duration-300 ease-in-out ${
            showFilter
              ? 'opacity-100 visible max-h-[500px]'
              : 'opacity-0 invisible max-h-0'
          } lg:block lg:opacity-100 lg:visible lg:max-h-[500px] lg:transform-none lg:float-left lg:w-[220px] lg:mr-6`}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium text-gray-900">Filters</h3>
                <button className="text-sm text-orange-600 hover:text-orange-700">
                  Clear All
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <select
                    className="w-full text-sm border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    value={formdata.categoryId || catogoryId || "All Categories"}
                    onChange={(e) => {
                      const selectedCategory = categoryData.find(
                        (category) => category._id === e.target.value
                      );
                      setFormData((prevData) => ({
                        ...prevData,
                        categoryId: e.target.value,
                        categoryName: selectedCategory
                          ? selectedCategory.name
                          : "All Categories",
                      }));
                    }}
                    name="categoryId"
                  >
                    <option value="">All Categories</option>
                    {categoryData?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div>
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="w-full text-sm border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <select className="w-full text-sm border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option> */}
                  {/* </select>
                </div> */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Coupon Cards Grid */}
        <div className={`${showFilter ? 'lg:ml-[240px]' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {category?.map((value, index) => (
              <CouponCard
                key={index}
                companylogo={value?.store?.logo}
                image={value?.category?.image}
                minPurchase={value.minimumPurchaseAmount}
                description={value.description}
                id={value._id}
                code={value.couponCode}
              />
            ))}
          </div>
        </div>
      </div>
      <SeoTags
        title="Smart Coupons & Promo Codes | CouponSmartDeals"
        description="Use smart coupons and promo codes to save online! CouponSmartDeals brings the best offers from top brands. Explore discounts, deals, and savings."
        canonical="https://www.couponsmartdeals.com"
      />
    </div>
  );
};

export default CategoryPage;
