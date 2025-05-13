import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreCard from './StoreCard';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetStore } from '../redux/storeSlice';
import SeoTags from './SeoTags';

const TopStoresSection = () => {
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/stores`,
    };

    const makeRequest = async () => {
      try {
        const response = await axios.request(config);
        const sortedStores = response.data.stores.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        setStores(sortedStores);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    makeRequest();
  }, []);

  return (
    <section className="w-full px-4 py-12 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">Top Stores</h2>
          <Link to="/store" onClick={() => dispatch(resetStore())}>
            <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium rounded-md shadow transition duration-300">
              Visit All Stores
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
          {stores.map((store) => (
            <StoreCard
              key={store._id}
              logo={store.logo}
              name={store.name}
              totalCoupons={store.totalCoupons}
              id={store._id}
            />
          ))}
        </div>
      </div>
      <SeoTags
        title="Smart Coupons & Promo Codes | CouponSmartDeals"
        description="Use smart coupons and promo codes to save online! CouponSmartDeals brings the best offers from top brands. Explore discounts, deals, and savings."
        canonical="https://www.couponsmartdeals.com"
      />
    </section>
  );
};

export default TopStoresSection;
