import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = () => {
  const images = [
    { url: '/assets/carousel/अंकशास्त्र.jpg' },
    { url: '/assets/carousel/ज्योतिष शास्त्र .jpg' },
    { url: '/assets/carousel/भाग्यकारक मोबाईल नंबर.jpg' },
    { url: '/assets/carousel/मोबाईल नंबर.jpg' },
    { url: '/assets/carousel/वास्तुशास्त्र.jpg' },
    { url: '/assets/carousel/स्क्रीन लॉक.jpg' }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
      
    }, 6000);

    return () => clearInterval(intervalId);
  }, [nextImageIndex, images.length]);

  const handleDotClick = (index) => {
    if (index === currentImageIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setNextImageIndex((index + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="px-2 sm:px-3 md:px-5 lg:px-9 pt-16 sm:pt-20 md:pt-24">
      <div className='relative bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-lg'>
        {/* Container with fixed aspect ratio (adjust as needed) */}
        <div className='relative w-full pb-[56.25%]'> {/* 16:9 aspect ratio */}
          {/* Current Image - now using contain instead of cover */}
          <img 
            src={images[currentImageIndex].url} 
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 object-contain ${
              isTransitioning ? 'opacity-20' : 'opacity-100'
            }`}
            alt="Carousel image"
          />
        </div>
                
        {/* Improved Navigation Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'bg-white w-6' : 'bg-white/60 w-2.5 hover:bg-white/80'
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;