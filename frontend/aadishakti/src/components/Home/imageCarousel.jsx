import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Carousel = () => {
  const images = [
    {
      url: '/assets/heroimg.jpg',
      title: 'अंधश्रद्धा टाळा विज्ञान जाणून घ्या',
      description: 'शास्त्र समजून घ्या, अंधश्रद्धेपासून दूर रहा!'
    },
    {
      url: '/assets/hero2.jpg',
      title: 'ज्योतिष जाणून घ्या – जीवन समजून घ्या!',
      description: 'ग्रह, नक्षत्रं, आणि राशी हे तुमचं आयुष्य अधिक चांगल्या प्रकारे समजून घेण्याची साधने आहेत. त्यांचा वापर योग्य मार्गदर्शनासाठी करा.'
    },
    {
      url: '/assets/hero3.jpg',
      // title: 'Spiritual Guidance',
      // description: 'Find your path to enlightenment'
    },
    {
      url: '/assets/hero4.jpg',
      // title: 'Divine Connection',
      // description: 'Connect with your higher self'
    },
    {
      url: '/assets/hero5.jpg',
      // title: 'Sacred Knowledge',
      // description: 'Learn the mysteries of the universe'
    }
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

  return (
    <div className="px-5 lg:px-9 pt-9">

      <div className='relative bg-black rounded-3xl overflow-hidden'>
        <div className='absolute inset-0 bg-black opacity-25 z-10'></div>
        
        {/* Current Image */}
        <img 
          src={images[currentImageIndex].url} 
          className={`w-full h-[360px] md:h-[500px] lg:h-[600px] absolute top-0 left-0 transition-opacity duration-1000 object-cover ${
            isTransitioning ? 'opacity-20' : 'opacity-100'
          }`}
          alt={images[currentImageIndex].title}
        />
        
        {/* Placeholder to maintain layout */}
        <div className='w-full h-[360px] md:h-[500px] lg:h-[600px]'></div>
                
        <div className='absolute w-full top-1/2 -translate-y-1/2 flex flex-col space-y-3 justify-center items-center px-5 md:px-10 z-20'>
          <motion.h2
            className='text-white font-bold text-[28px] md:text-[36px] lg:text-[65px] leading-[36px] md:leading-[48px] lg:leading-[74px] text-center'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {images[currentImageIndex].title}
          </motion.h2>

          <motion.p
            className='text-white text-[12px] md:text-[14px] lg:text-[20px] w-full md:w-[60%] text-center pb-2 lg:pb-8'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {images[currentImageIndex].description}
          </motion.p>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setNextImageIndex((index + 1) % images.length);
                  setIsTransitioning(false);
                }, 500);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;