import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const images = [
    {
      url: "/assets/carousel/anks3.jpg",
      // title: "अंधश्रद्धा टाळा विज्ञान जाणून घ्या",
      // description: "शास्त्र समजून घ्या, अंधश्रद्धेपासून दूर रहा!",
    },
    {
      url: "/assets/carousel/ज्योतिष शास्त्र2.jpg",
      // title: "ज्योतिष जाणून घ्या – जीवन समजून घ्या!",
      // description:
      //   "ग्रह, नक्षत्रं, आणि राशी हे तुमचं आयुष्य अधिक चांगल्या प्रकारे समजून घेण्याची साधने आहेत. त्यांचा वापर योग्य मार्गदर्शनासाठी करा.",
    },
    {
      url: "/assets/carousel/भाग्यकारक मोबाईल नंबर.jpg",
      // title: "",
      // description: "",
    },
    {
      url: "/assets/carousel/मोबाईल नंबर2.jpg",
      // title: "",
      // description: "",
    },
    {
      url: "/assets/carousel/वास्तुशास्त्र2.jpg",
      // title: "",
      // description: "",
    },
    {
      url: "/assets/carousel/स्क्रीन लॉक2.jpg",
      // title: "",
      // description: "",
    },
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
      <div className="relative bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
        {/* Enhanced overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-10"></div>

        {/* Current Image */}
        <img
          src={images[currentImageIndex].url}
          className={`w-full h-[500px] md:h-[650px] lg:h-[750px] absolute top-0 left-0 transition-opacity duration-1000 object-cover ${
            isTransitioning ? "opacity-20" : "opacity-100"
          }`}
          alt={images[currentImageIndex].title || "Carousel image"}
        />

        {/* Placeholder to maintain layout */}
        <div className="w-full h-[500px] md:h-[650px] lg:h-[750px]"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute w-full top-1/2 -translate-y-1/2 flex flex-col space-y-4 md:space-y-5 justify-center items-center px-4 sm:px-6 md:px-10 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {images[currentImageIndex].title && (
              <motion.h2
                className="text-white font-bold text-[32px] sm:text-[36px] md:text-[45px] lg:text-[65px] leading-[1.1] md:leading-[1.2] lg:leading-[1.15] text-center drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {images[currentImageIndex].title}
              </motion.h2>
            )}

            {images[currentImageIndex].description && (
              <motion.p
                className="text-white text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] w-[92%] sm:w-[85%] md:w-[70%] lg:w-[60%] text-center pb-3 md:pb-5 lg:pb-8 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {images[currentImageIndex].description}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Improved Navigation Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentImageIndex === index
                  ? "bg-white w-6"
                  : "bg-white/60 w-2.5 hover:bg-white/80"
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
