import React, { useState, useEffect } from "react";
import axios from "axios";
import macbook from "../../assets/dealoftheday_image.jpg";
import CouponCard from "./CouponCard";

const DealOfDaySection = () => {
  const [couponDetails, setCouponDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/coupons/`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const makeRequest = async () => {
      try {
        const response = await axios.request(config);
        const data = response.data;
        setCouponDetails(data.filter((value) => value.featured));
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        setCouponDetails([]);
      } finally {
        setLoading(false);
      }
    };

    makeRequest();
  }, []);

  return (
    <section className="w-full px-4 py-10 md:py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-800 tracking-tight">
          Deals of the Day
        </h2>

        {loading ? (
          <p className="text-center text-lg text-gray-500 animate-pulse">Loading amazing deals...</p>
        ) : couponDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300">
            {couponDetails.map((deal) => (
              <CouponCard
                key={deal._id}
                companylogo={deal?.store?.logo}
                image={deal?.category?.image || macbook}
                minPurchase={deal.minimumPurchaseAmount}
                description={deal.description}
                id={deal._id}
                code={deal.couponCode}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg p-6 bg-gray-100 rounded-md">
              No featured deals available right now. Please check back later!
          </p>
        )}
      </div>
    </section>
  );
};

export default DealOfDaySection;
