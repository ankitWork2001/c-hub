import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DealOfDaySection from "../components/DealOfDaySection";
import CategoriesSection from "../components/CategoriesSection";
import CouponCard from "../components/CouponCard";
import StoreCard from "../components/StoreCard"; // Added StoreCard import
import CategoryCard from "../components/CategoryCard";
import SeoTags from "../components/SeoTags";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  const [couponResults, setCouponResults] = useState([]);
  const [storeResults, setStoreResults] = useState([]); // Added storeResults state
  const [categoryResults, setCategoryResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const [couponsRes, categoriesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/coupons`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}` },
          }),
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/categories`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}` },
          }),
        ]);

        // Filter coupons based on search query
        const filteredCoupons = (couponsRes.data || []).filter(
          (coupon) =>
            coupon.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coupon.couponCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coupon.category?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coupon.store?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Extract unique stores from coupons and calculate totalCoupons
        const storeMap = new Map();
        filteredCoupons.forEach((coupon) => {
          const storeId = coupon.store?._id;
          if (storeId) {
            if (!storeMap.has(storeId)) {
              storeMap.set(storeId, {
                ...coupon.store,
                totalCoupons: 0,
              });
            }
            storeMap.get(storeId).totalCoupons += 1;
          }
        });

        // Convert storeMap to array and sort by store creation date
        const sortedStores = Array.from(storeMap.values()).sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });

        const filteredCategories = (categoriesRes.data.categories || []).filter(
          (category) => category.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setCouponResults(filteredCoupons);
        setStoreResults(sortedStores);
        setCategoryResults(filteredCategories);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setCouponResults([]);
        setStoreResults([]);
        setCategoryResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="w-full px-4 py-10 bg-white font-sans">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-800 tracking-tight">
              Search Results for "{searchQuery}"
            </h2>

            {loading ? (
              <p className="text-center text-lg text-gray-500 animate-pulse">
                Loading results...
              </p>
            ) : (
              <>
                {/* Coupons Section */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Coupons</h3>
                  {couponResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300">
                      {couponResults.map((deal) => (
                        <CouponCard
                          key={deal._id}
                          companylogo={deal?.store?.logo}
                          storeName={deal?.store?.name}
                          image={deal?.category?.image}
                          minPurchase={deal.minimumPurchaseAmount}
                          description={deal.description}
                          id={deal._id}
                          code={deal.couponCode}
                          basePath="/dealofday"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 text-lg p-6 bg-gray-100 rounded-md">
                      No coupons found for "{searchQuery}".
                    </p>
                  )}
                </div>

                {/* Stores Section */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Stores</h3>
                  {storeResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
                      {storeResults.map((store) => (
                        <StoreCard
                          key={store._id}
                          logo={store.logo}
                          name={store.name}
                          totalCoupons={store.totalCoupons}
                          id={store._id}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 text-lg p-6 bg-gray-100 rounded-md">
                      No stores found for "{searchQuery}".
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
        
      </main>
      <SeoTags
        title={`Search Results for ${searchQuery} | CouponSmartDeals`}
        description={`Find the best coupons, stores, and categories for "${searchQuery}" on CouponSmartDeals. Explore discounts, deals, and savings from top brands.`}
        canonical={`https://www.couponsmartdeals.com/search?query=${encodeURIComponent(searchQuery)}`}
      />
    </div>
  );
};

export default SearchResults;
