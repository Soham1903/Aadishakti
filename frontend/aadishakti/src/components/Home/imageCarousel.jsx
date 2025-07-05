import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const images = [
    {
      url: "/assets/carousel/1.jpg",
      title: "ज्योतिष शास्त्र",
      subtitle: "सल्ला, मार्गदर्शन आणि कार्यशाळा",
    },
    {
      url: "/assets/carousel/2.jpg",
      title: "अंकशास्त्र",
      subtitle: " सल्ला, मार्गदर्शन आणि कार्यशाळा",
    },
    {
      url: "/assets/carousel/3.jpg",
      title: "वास्तुशास्त्र",
      subtitle: "सल्ला, मार्गदर्शन आणि कार्यशाळा",
    },
    {
      url: "/assets/carousel/4.jpg",
      title: "मोबाईल नंबर",
      subtitle: "सल्ला, मार्गदर्शन आणि कार्यशाळा",
    
    },
    {
      url: "/assets/carousel/5.jpg",
      title: "मोबाईल नंबर",
      subtitle: "भाग्यकारक मोबाईल नंबर मार्गदर्शन",
    },
    {
      url: "/assets/carousel/6.jpg",
      title: "स्क्रीन लॉक",
      subtitle: "भाग्यकारक स्क्रीन लॉक पासवर्ड मार्गदर्शन",
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
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 pt-24 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32">

      <div className="relative bg-black rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] overflow-hidden">
          <img
            src={images[currentImageIndex].url}
            className={`w-full h-full object-cover object-center transition-all duration-1000 ${
              isTransitioning ? "opacity-20 scale-105" : "opacity-100 scale-100"
            }`}
            alt={images[currentImageIndex].title || "Carousel image"}
            loading="lazy"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-white font-khand font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-3 sm:mb-4 md:mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                textShadow:
                  "4px 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.7)",
                WebkitTextStroke: "1px rgba(0,0,0,0.5)",
              }}
            >
              {images[currentImageIndex].title}
            </motion.h1>

            <motion.p
              className="text-white font-khand font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                textShadow:
                  "4px 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.7)",
                WebkitTextStroke: "1px rgba(0,0,0,0.5)",
              }}
            >
              {images[currentImageIndex].subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 shadow-lg ${
                currentImageIndex === index
                  ? "bg-white w-6 sm:w-8 md:w-10 shadow-white/50"
                  : "bg-white/60 w-2 sm:w-2.5 md:w-3 hover:bg-white/80 hover:shadow-white/30"
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-25">
          <motion.div
            className="h-full bg-white/80"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
