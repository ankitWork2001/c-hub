import React from 'react'
import { useDispatch } from 'react-redux';
import { setStoreId,setStoreName } from '../redux/storeSlice';
import { useNavigate } from 'react-router-dom';
const StoreCard = ({logo,name,totalCoupons,id}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log(`Clicked on ${name}`);
    dispatch(setStoreId(id));
    dispatch(setStoreName(name));

    navigate(`/store`);
  };
  return (
    <div className='bg-amber-50 flex flex-col justify-center items-center border-3 rounded-lg border-yellow-500 gap-2 p-3 sm:p-4 md:p-5 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
    onClick={handleClick}
    >

      <img 
        src={logo} 
        alt={`${name} logo`} 
        className="mix-blend-multiply object-contain h-24 w-34"
      />
      <h2 className='text-xl font-semibold'>{name}</h2>
      
      <button className='border-1 px-2 md:px-4 py-2 rounded bg-white text-orange-400 flex gap-x-1 flex-wrap justify-center'>
        <div>
         Upto 
        </div>
        <div>
         {totalCoupons} % 
        </div>
      </button>

    </div>
  )
}

export default StoreCard