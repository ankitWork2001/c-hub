import React from 'react';

const CategoryCard = ({image, name, totalCoupons}) => {
  const scrollToCategory = () => {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div 
      className='flex flex-col justify-center items-center cursor-pointer 
        border-2 rounded-lg border-yellow-500 hover:border-yellow-600
        transition-all duration-300 ease-in-out
        p-2 sm:p-3 md:p-4 lg:p-5
        hover:shadow-md hover:scale-105
        min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px]'
      onClick={scrollToCategory}
    >
      <img 
        src={image} 
        alt={`${name} category`} 
        className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 
          object-contain mb-2 sm:mb-3'
      />
      <p className='font-bold font-serif text-sm sm:text-base md:text-lg text-center line-clamp-1'>
        {name}
      </p>
      <p className='text-xs sm:text-sm md:text-base text-gray-600'>
        {totalCoupons} offers
      </p>
    </div>
  );
}

export default CategoryCard;
