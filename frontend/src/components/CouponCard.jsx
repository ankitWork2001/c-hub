import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCouponId } from '../redux/couponSlice';
import SeoTags from './SeoTags';

const CouponCard = ({ companylogo, image, minPurchase, description, id, code, title, basePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClick = () => {
    dispatch(setCouponId(id));
    navigate(`${basePath}/coupon/${id}`); 
  };
  
  const truncatedDesc = description && description.length > 100 
    ? `${description.slice(0, 100)}...` 
    : description;
  
  return (
    <div className='relative bg-[#f9f7f5] border border-gray-200 rounded-lg shadow-md overflow-hidden w-full md:w-[330px]'>
      <div className='p-4 pb-2'>
        {companylogo && (
          <img 
            src={companylogo} 
            alt="Company logo" 
            className='h-8 w-auto object-contain mix-blend-multiply' 
          />
        )}
      </div>
      <div className='px-4 pb-1'>
        <h2 className='text-2xl font-bold text-gray-800'>
          {title || "Special Offer"}
        </h2>
      </div>
      <div className='px-4 pb-4'>
        <p className='text-orange-500 font-medium text-lg'>
          Starting at ₹{minPurchase || "1"}
        </p>
      </div>
      <div className='flex px-4 min-h-45'>
        <div className='w-2/3 pr-2'>
          <div className='text-gray-700 space-y-4'>
            <p className='flex items-start'>
              <span className='text-blue-600 mr-2 flex-shrink-0'>◆</span>
              <span className='flex-1'>{truncatedDesc || "Versatile, durable, and thoughtfully made to suit your needs with quality you can trust daily."}</span>
            </p>
            <p className='flex items-start'>
              <span className='text-blue-600 mr-2 flex-shrink-0'>◆</span>
              <span className='flex-1'>Min. purchase: ₹{minPurchase}</span>
            </p>
          </div>
        </div>
        <div className='w-1/3'>
          {image && (
            <img 
              src={image} 
              alt="Offer image" 
              className='h-full w-full object-cover' 
            />
          )}
        </div>
      </div>
      <div className='mt-6 p-4 pt-10 relative'>
        <div className='absolute h-13 bottom-4 right-[6.5rem] bg-white border-dashed border-2 border-gray-300 text-gray-500 py-2 px-4 rounded items-center flex justify-center'>
          <span className='font-mono'>{code}</span>
        </div>
        <div className='flex justify-end'>
          <button 
            onClick={handleClick} 
            className='bg-[#ff6a00] hover:bg-orange-600 text-white px-8 py-3 rounded font-medium text-lg transition-colors duration-200 z-10 cursor-pointer'
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

export default CouponCard;
