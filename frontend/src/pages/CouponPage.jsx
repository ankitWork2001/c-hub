import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCopy, FiExternalLink } from 'react-icons/fi'; 
import { useSelector } from 'react-redux';
const CouponPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);

    const couponId = useSelector((state) => state.coupon.couponId);

    useEffect(()=>{
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_APP_BACKEND}api/coupons/${couponId}`, 
            headers: {
                "Content-Type": "application/json",
                
            },
        };
        async function makeRequest() {
            try {
                let response = await axios.request(config);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching coupon data:", error);
                setError(true);
            } finally{
                setLoading(false);
            }
        }
        makeRequest();
    },[])

    const formatDateForIndia = (isoDateString) => {
        if (!isoDateString) return "Invalid date";
        try {
          const date = new Date(isoDateString);
          if (isNaN(date.getTime())) return "Invalid date";
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          return date.toLocaleDateString('en-IN', options);
        } catch (error) {
          console.error("Error formatting date:", error);
          return "Invalid date";
        }
      };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

  if (loading) return <Loader />;
  if (error || !data) return <ErrorMessage />;

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
        <h1 className="text-3xl md:text-4xl text-center mb-10 font-bold text-gray-800">
            {data.store?.name ? `${data.store.name} : Best Deals & Coupons` : 'Coupon Details'}
        </h1>

        <div className='bg-white shadow-xl rounded-lg border border-gray-200 flex flex-col md:flex-row overflow-hidden'>

            {/* Left Column: Coupon & Action - MODERNIZED */}
            <div className='w-full md:w-[60%] p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between'>
                <div> {/* Top content wrapper */}
                    {/* Header: Discount & Logo */}
                    <div className='flex items-start justify-between mb-6'> {/* Increased bottom margin */}
                        <div>
                            <h2 className='text-2xl md:text-3xl font-bold text-blue-700 mb-1'> {/* Bolder text, adjusted color */}
                                {data.discountType && data.discountType.charAt(0).toUpperCase() + data.discountType.slice(1)} {data.discountValue}{data.discountType === 'percentage' ? '%' : ''} Off
                            </h2>
                            {data.terms && <p className='text-gray-600 text-sm md:text-base'>{data.terms}</p>} {/* Removed "Exclusive Offer:" prefix if redundant */}
                        </div>
                        {data.store?.logo &&
                            <img className='w-16 h-16 object-contain flex-shrink-0 ml-4 rounded-md' src={data.store.logo} alt={`${data.store.name} Logo`} /> // Slightly smaller, rounded, shadow
                        }
                    </div>

                    {/* Coupon Code Section */}
                    <div className='mb-8'> {/* Increased bottom margin */}
                        <p className='font-medium text-gray-600 text-base mb-2'>Use this code at checkout:</p> {/* Adjusted text size/weight */}
                        <div className='flex items-stretch gap-2'> {/* Reduced gap */}
                            <div className='flex-grow bg-gray-100 border border-dashed rounded-lg flex items-center justify-center px-4 py-3'> {/* Changed background, solid border, more padding */}
                                <span className='text-gray-800 text-2xl font-mono font-bold tracking-widest break-all select-all'> {/* Changed text color, increased size, mono font, select-all */}
                                    {data.couponCode}
                                </span>
                            </div>
                            <button
                                onClick={() => handleCopy(data.couponCode)}
                                title="Copy Code" // Added title attribute
                                className={`flex items-center justify-center px-4 py-3 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    copied
                                    ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                                    : 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500'
                                }`}
                            >
                                <FiCopy className="mr-2 h-5 w-5" /> {/* Added icon */}
                                {copied ? 'COPIED' : 'COPY'} {/* Shortened text */}
                            </button>
                        </div>
                    </div>
                </div> {/* End top content wrapper */}

                {/* Go to Website Link */}
                {data.affiliateLink && data.store?.name &&
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={data.affiliateLink}
                        className='bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center text-center py-3 mt-4 rounded-lg font-medium text-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' // Added focus styles
                    >
                        <FiExternalLink className="mr-2 h-5 w-5" /> {/* Added icon */}
                        Go to {data.store.name}
                    </a>
                }
            </div>

            {/* Right Column: About Deal */}
            <div className='w-full md:w-[40%] p-6 md:p-8 bg-gray-50 rounded-b-lg md:rounded-r-lg md:rounded-b-none'>
                <h3 className='font-semibold text-2xl text-gray-800 mb-5'>About this Deal</h3>
                <ul className='space-y-3 text-gray-700'> {/* Increased spacing */}
                    {data.store?.name && <ListItem icon="🛒" label="Store" value={data.store.name} />}
                    {data.category?.name && <ListItem icon="🏷️" label="Category" value={data.category.name} />}
                    {data.description && <ListItem icon="ℹ️" label="Description" value={data.description} />}
                    {data.minimumPurchaseAmount != null && data.minimumPurchaseAmount > 0 && <ListItem icon="💰" label="Min. Purchase" value={`₹${data.minimumPurchaseAmount}`} />}
                    {data.startDate && formatDateForIndia(data.startDate) !== "Invalid date" && <ListItem icon="📅" label="Starts On" value={formatDateForIndia(data.startDate)} />}
                    {data.expiryDate && formatDateForIndia(data.expiryDate) !== "Invalid date" && <ListItem icon="⏳" label="Expires On" value={formatDateForIndia(data.expiryDate)} />}
                    {data.couponType && <ListItem icon="📄" label="Type" value={data.couponType} />}
                    {data.tags && data.tags.length > 0 && <ListItem icon="🔖" label="Tags" value={data.tags.join(', ')} />}
                    {data.targetAudience && <ListItem icon="👥" label="For" value={`${data.targetAudience} only`} />}
                    {data.maxDiscountCap != null && data.maxDiscountCap > 0 && <ListItem icon="🧢" label="Max Discount" value={`₹${data.maxDiscountCap}`} />}
                    {data.usageLimit != null && data.usageLimit > 0 && <ListItem icon="🔄" label="Usage Limit" value={`${data.usageLimit} Times`} />}
                </ul>
            </div>
        </div>
    </div>
  );
}

// Helper component for list items in the "About" section
const ListItem = ({ icon, label, value }) => (
    <li className="flex items-start">
        <span className="mr-3 text-xl text-gray-500">{icon}</span> {/* Adjusted icon style */}
        <span className="text-base"> {/* Adjusted text size */}
            <span className="font-semibold text-gray-800">{label}:</span> {value}
        </span>
    </li>
);

// Simple Loader Component
const Loader = () => (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'> {/* Added background */}
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
    </div>
);

// Simple Error Message Component
const ErrorMessage = () => (
    <div className='flex items-center justify-center min-h-screen bg-red-50 text-center text-red-700 p-4'> {/* Added background and padding */}
        <div>
            <p className="text-2xl font-semibold mb-2">Oops! Something went wrong.</p>
            <p className="text-lg">We couldn't fetch the coupon details.<br/> Please try again later.</p>
        </div>
    </div>
);

export default CouponPage;