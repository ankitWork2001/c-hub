import React, { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "../components/CouponCard";
import macbook from "../../assets/dealoftheday_image.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStoreId, setStoreName } from "../redux/storeSlice";
import { FaFilter } from 'react-icons/fa'; // Add this import at the top

const StorePage = () => {
  const [store, setStore] = useState();
  const storeId = useSelector((state) => state.store.storeId);
  const storeName = useSelector((state) => state.store.storeName);
  const [storeData, setStoreData] = useState([]);
  const [formdata, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false); // Add this new state

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}api/coupons`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = response.data;
        if (storeId == null) {
          setStore(data);
        } else {
          setStore(
            data.filter((value) => value?.store?._id === storeId)
          );
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [storeId]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}api/stores`, {
          headers: { "Content-Type": "application/json" },
        });
        setStoreData(response.data.stores);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formdata.storeName === "All Stores") {
      formdata.storeId = null;
    }
    dispatch(setStoreId(formdata.storeId));
    dispatch(setStoreName(formdata.storeName));
    navigate("/store");
  };

  return (
    <div className="container mx-auto mt-[2rem] px-2 sm:px-4 max-w-[1440px]">
      <div className="relative mb-4 md:mb-6">
        {store?.length > 0 && (
          <h1 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">
            {storeName} : Best Deals
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

      {/* Rest of your existing JSX */}
      <div className="space-y-4">
        <div
          className={`transform transition-all duration-300 ease-in-out ${
            showFilter
              ? 'opacity-100 visible max-h-[500px]'
              : 'opacity-0 invisible max-h-0'
          } lg:opacity-100 lg:visible lg:max-h-[500px] lg:transform-none lg:float-left lg:w-[220px] lg:mr-6`}
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
                    value={formdata.storeId || storeId || "All Stores"}
                    onChange={(e) => {
                      const selectedStore = storeData.find(
                        (store) => store._id === e.target.value
                      );
                      setFormData((prevData) => ({
                        ...prevData,
                        storeId: e.target.value,
                        storeName: selectedStore ? selectedStore.name : "All Stores",
                      }));
                    }}
                    name="storeId"
                  >
                    <option value="">All Stores</option>
                    {storeData.map((store) => (
                      <option key={store._id} value={store._id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200"
                >
                  Apply Filter
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Coupon Cards Grid */}
        <div className={`${showFilter ? 'lg:ml-[240px]' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {store?.map((value, index) => (
              <CouponCard
                key={index}
                companylogo={value?.store?.logo}
                image={value?.category?.image || macbook }
                minPurchase={value.minimumPurchaseAmount}
                description={value.description}
                id={value._id}
                code={value.couponCode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
