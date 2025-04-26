import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import macbook from "../../assets/dealoftheday_image.jpg";

import CouponCard from "./CouponCard";
const DealOfDaySection = () => {
  const [couponDetails, setCouponDetails] = useState();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/coupons/`,
      headers: {
        "Content-Type": "application/json",
        
      },
    };
    async function makeRequest() {
      try { // Add try...catch for error handling
        let response = await axios.request(config);
        let data = response.data;
        setCouponDetails(
          data.filter((value) => {
            return value.featured;
          })
        );
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        setCouponDetails([]); // Set to empty array on error to avoid issues
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    }

    makeRequest();
  }, []);

  return (
    <>
    <div className="m-auto my-5 w-[90vw]"> {/* Added padding */}
      <h1 className="text-4xl mb-4" > Deals Of The Day</h1>
      <div className="flex flex-wrap gap-10 justify-center"> {/* Added justify-center */}
      {loading ? (
          <p className="text-center w-full text-gray-500">Loading deals...</p> // Show loading indicator
        ) : couponDetails && couponDetails.length > 0 ? (
          couponDetails.map((value) => { // Use value._id for key if available and unique
            return (
              <CouponCard
                key={value._id || index} // Prefer unique ID from data if possible
                companylogo={value?.store?.logo}
                image={value?.category?.image || macbook}
                minPurchase={value.minimumPurchaseAmount}
                description={value.description}
                id={value._id}
                code={value.couponCode}
              />
            );
          })
        ) : (
          <p className="text-center w-full text-gray-500 p-4">
            No featured Deals of the Day available right now. Check back soon!
          </p> // Message when no deals are found
        )}
      </div>
      </div>
    </>
  );
};

export default DealOfDaySection;