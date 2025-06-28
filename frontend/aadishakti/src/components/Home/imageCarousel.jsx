import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const images = [
    { url: "/assets/carousel/anks3.jpg" },
    { url: "/assets/carousel/ज्योतिष शास्त्र2.jpg" },
    { url: "/assets/carousel/भाग्यकारक मोबाईल नंबर.jpg" },
    { url: "/assets/carousel/मोबाईल नंबर2.jpg" },
    { url: "/assets/carousel/वास्तुशास्त्र2.jpg" },
    { url: "/assets/carousel/स्क्रीन लॉक2.jpg" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

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

  const handleImageLoad = () => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    }
  };

  const handleDotClick = (index) => {
    if (index === currentImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setNextImageIndex((index + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const getResponsiveStyles = () => {
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const maxWidths = { mobile: '100vw', tablet: '90vw', desktop: '85vw' };
    const maxHeights = { mobile: '60vh', tablet: '70vh', desktop: '75vh' };

    return {
      maxWidth: maxWidths.desktop,
      maxHeight: maxHeights.desktop,
      aspectRatio: aspectRatio || 16 / 9,
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <div className="px-2 sm:px-3 md:px-5 lg:px-9 pt-20 sm:pt-24 md:pt-28">
      <div className="flex justify-center">
        <div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
          style={{
            maxWidth: responsiveStyles.maxWidth,
            maxHeight: responsiveStyles.maxHeight,
            width: '100%',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-10"></div>

          <div className="relative w-full">
            <img
              ref={imageRef}
              src={images[currentImageIndex].url}
              className={`w-full h-auto transition-opacity duration-1000 object-contain ${
                isTransitioning ? "opacity-20" : "opacity-100"
              }`}
              style={{
                maxHeight: responsiveStyles.maxHeight,
                aspectRatio: responsiveStyles.aspectRatio,
              }}
              alt="Carousel image"
              onLoad={handleImageLoad}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 flex flex-col space-y-4 md:space-y-5 justify-center items-center px-4 sm:px-6 md:px-10 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {images[currentImageIndex].title && (
                <motion.h2
                  className="text-white font-bold text-[24px] sm:text-[32px] md:text-[45px] lg:text-[65px] leading-[1.1] md:leading-[1.2] lg:leading-[1.15] text-center drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {images[currentImageIndex].title}
                </motion.h2>
              )}

              {images[currentImageIndex].description && (
                <motion.p
                  className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] w-[92%] sm:w-[85%] md:w-[70%] lg:w-[60%] text-center pb-3 md:pb-5 lg:pb-8 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {images[currentImageIndex].description}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  currentImageIndex === index
                    ? "bg-white w-5 sm:w-6"
                    : "bg-white/60 w-2 sm:w-2.5 hover:bg-white/80"
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
