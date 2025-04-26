import React, { useEffect,useState } from 'react'
import axios from 'axios';
import StoreCard from './StoreCard';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {resetStore } from '../redux/storeSlice';
const TopStoresSection = () => {
    const dispatch = useDispatch();
    const [stores, setStores] = useState([]);
    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_APP_BACKEND}api/stores`,
          };
          
          async function makeRequest() {
            try {
              const response = await axios.request(config);
              // Sort stores by createdAt date (ascending order - oldest first)
              const sortedStores = response.data.stores.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
              });
              setStores(sortedStores);
            }
            catch (error) {
              console.log(error);
            }
          }
          
          makeRequest();
    },[]);

  return (
    <div className='w-[90vw] m-auto mt-5'>
        <div className='flex justify-between mb-10 items-center'>
            <h1 className='text-4xl'>Top Stores</h1>
            <Link to='/store' onClick={()=>{dispatch(resetStore())}}>
            <button className=' text-orange-300 text-2xl rounded cursor-pointer' >Visit All Stores</button>
            </Link>
        </div>
        {/* The main flex container */}
        <div className='flex flex-wrap gap-x-8 gap-y-8 justify-center items-center bg-amber-200 p-3 md:p-10 rounded-lg'>
            {stores?.map((value)=>{ 
                return (
                    
                    <div key={value._id} className="w-[calc(50%-1rem)] sm:w-auto"> 
                        <StoreCard logo={value.logo} name={value.name} totalCoupons={value.totalCoupons} id={value._id} />
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default TopStoresSection