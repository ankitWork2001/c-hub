import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategoryId, setCategoryName } from '../redux/categorySlice';
import { setCouponId } from '../redux/couponSlice';
import SeoTags from './SeoTags';

const VariousCategorySection = () => {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/coupons`,
    };

    const makeRequest = async () => {
      try {
        const response = await axios.request(config);
        const data = response.data;

        const result = data.reduce((acc, item) => {
          if (!item.category) {
            console.warn("Coupon missing category:", item._id);
            return acc;
          }

          const existingCategory = acc.find(c => c.category === item.category.name);
          if (existingCategory) {
            existingCategory.coupons.push(item);
          } else {
            acc.push({
              category: item.category.name,
              categoryId: item.category._id,
              coupons: [item]
            });
          }
          return acc;
        }, []);

        setCategories(result);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        setCategories([]);
      }
    };

    makeRequest();
  }, []);

  if (categories.length === 0) {
    return <div className="text-center py-10">Loading categories...</div>;
  }

  return (
    <div className="w-full max-w-[90vw] mx-auto mt-5 px-4 sm:px-6">
      {categories.map((item) => (
        <IndividualCategorySection
          key={item.categoryId || item.category}
          categoryName={item.category}
          coupons={item.coupons}
          categoryId={item.categoryId}
          basePath="/category"
        />
      ))}
    </div>
  );
};

const IndividualCategorySection = ({ categoryName, coupons, categoryId, basePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (!categoryId) {
      console.error("Missing categoryId");
      return;
    }
    dispatch(setCategoryId(categoryId));
    dispatch(setCategoryName(categoryName));
    navigate(basePath);
  };

  if (!coupons || coupons.length === 0) {
    return null;
  }

  return (
    <div id={categoryName} className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold pb-2 border-b-2 border-blue-500">
          {categoryName}
        </h2>
        <button
          onClick={handleViewMore}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-300 cursor-pointer text-sm sm:text-base"
        >
          View More
        </button>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 p-4 sm:p-5 rounded-lg"
          style={{
            borderRadius: '8px',
            border: '1px solid rgba(80, 85, 92, 0.5)',
            background: 'linear-gradient(176.94deg, #F8F9FA 2, #FFE992 97.48%)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            minHeight: '343px'
          }}
      >
        {coupons.map((coupon) => (
          <CouponCategoryCard
            key={coupon._id}
            id={coupon._id}
            logo={coupon.store?.logo}
            brand={coupon.store?.name}
            desc={coupon.description}
            couponCode={coupon.couponCode}
            basePath={basePath}
          />
        ))}
      </div>
    </div>
  );
};

const CouponCategoryCard = ({ logo, brand, desc, id, couponCode, basePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setCouponId(id));
    navigate(`${basePath}/coupon/${id}`); // Fixed navigation
  };

  return (
    <div className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-2rem)] xl:w-70 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center bg-white">
      <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center">
        <img src={logo} alt={brand} className="max-w-full max-h-full object-contain mix-blend-multiply" />
      </div>
      <h3 className="font-bold text-md sm:text-lg text-gray-800 mb-2 text-center">{brand}</h3>
      <p className="text-black text-sm text-center mb-4">
        {desc ? (desc.length > 100 ? `${desc.slice(0, 100)}...` : desc) : 'Versatile, durable, and thoughtfully made to suit your needs with quality you can trust daily.'}
      </p>
      <div className="mt-6 p-4 pt-10 relative w-full">
        <div className="absolute h-13 bottom-4 right-[6.5rem] bg-white border-dashed border-2 border-gray-300 text-gray-500 py-2 px-4 rounded items-center flex justify-center">
          <span className="font-mono">{couponCode || 'save10'}</span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleClick}
            className="bg-[#ff6a00] hover:bg-orange-600 text-white px-8 py-3 rounded font-medium text-lg transition-colors duration-200 z-10 cursor-pointer"
          >
            Get Deal
          </button>
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

export default VariousCategorySection;
