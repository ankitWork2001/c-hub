import React from 'react';
import { useDispatch } from 'react-redux';
import { setStoreId, setStoreName } from '../redux/storeSlice';
import { useNavigate } from 'react-router-dom';

const StoreCard = ({ logo, name, totalCoupons, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setStoreId(id));
    dispatch(setStoreName(name));
    navigate(`/store`);
  };

  return (
    <div
      className="bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg p-4 sm:p-5 flex flex-col items-center text-center cursor-pointer transition-all hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="w-20 h-20 mb-3 flex items-center justify-center">
        <img
          src={logo}
          alt={`${name} logo`}
          className="object-contain w-full h-full mix-blend-multiply"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
      <div className="bg-orange-100 text-orange-600 font-medium px-3 py-1 rounded-full text-sm">
        Upto {totalCoupons}% Off
      </div>
    </div>
  );
};

export default StoreCard;
