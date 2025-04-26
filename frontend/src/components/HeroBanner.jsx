import React, { useState, useEffect, useRef } from 'react';
import img from '../../assets/caraousel_image.webp';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1624521793559-136bfe16fc86?q=80&w=1400&auto=format&fit=crop',
    alt: 'Slide 1',
  },
  { src: img, alt: 'Slide 2' },
  {
    src: 'https://images.unsplash.com/photo-1590599145008-e4ec48682067?w=500&auto=format&fit=crop',
    alt: 'Slide 3',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=1470&auto=format&fit=crop',
    alt: 'Slide 4',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1683887064255-1c428d0b3934?q=80&w=1486&auto=format&fit=crop',
    alt: 'Slide 5',
  },
  {
    src: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1470&auto=format&fit=crop',
    alt: 'Slide 6',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?q=80&w=1374&auto=format&fit=crop',
    alt: 'Slide 7',
  },
];

const HeroBanner = () => {
  const [index, setIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const [allowClick, setAllowClick] = useState(true);
  const timeoutRef = useRef(null);

  const isMobile = window.innerWidth < 640;
  const slideWidth = isMobile ? 100 : 50;

  const slides = [images[images.length - 1], ...images, images[0]];

  const goToIndex = (i) => {
    if (!allowClick) return;

    setAllowClick(false);
    setTransitioning(true);
    setIndex(i);
  };

  const nextSlide = () => goToIndex(index + 1);
  const prevSlide = () => goToIndex(index - 1);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (allowClick) nextSlide();
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, allowClick]);

  const handleTransitionEnd = () => {
    setAllowClick(true);

    if (index === 0) {
      setTransitioning(false);
      setIndex(images.length);
    } else if (index === slides.length - 1) {
      setTransitioning(false);
      setIndex(1);
    }
  };

  useEffect(() => {
    if (!transitioning) {
      const id = requestAnimationFrame(() => {
        setTransitioning(true);
        setAllowClick(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transitioning]);

  return (
    <div className="relative w-[90vw] mx-auto mt-6 overflow-hidden">
      <div
        className={`flex ${transitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{
          transform: `translateX(-${index * slideWidth}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((img, idx) => (
          <div key={idx} className="min-w-full sm:min-w-[50%] px-2">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-[200px] sm:h-[300px] object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        disabled={!allowClick}
        className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-opacity duration-300 ${
          allowClick ? 'opacity-100' : 'opacity-50 '
        }`}
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        disabled={!allowClick}
        className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-opacity duration-300 ${
          allowClick ? 'opacity-100' : 'opacity-50 '
        }`}
      >
        ❯
      </button>
    </div>
  );
};

export default HeroBanner;
