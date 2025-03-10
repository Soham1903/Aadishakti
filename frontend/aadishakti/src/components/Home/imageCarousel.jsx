import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/images");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ backgroundColor: "#fff6f3" }} className="p-8 rounded-lg">
      <div className="relative w-full mx-auto">
        <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
          {images.map((img, index) => (
            <div
              key={img._id}
              className={`duration-700 ease-in-out ${
                index === activeIndex ? "block" : "hidden"
              }`}
            >
              {img.contentType && img.imageBase64 ? (
                <img
                  src={`data:${img.contentType};base64,${img.imageBase64}`}
                  alt={img.filename}
                  className="absolute block w-full h-full object-cover"
                />
              ) : (
                <p>Image data is missing or invalid.</p>
              )}
            </div>
          ))}
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30 bg-white/30 p-2 rounded-full hover:bg-white/50"
          onClick={goToPrevSlide}
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30 bg-white/30 p-2 rounded-full hover:bg-white/50"
          onClick={goToNextSlide}
        >
          <ChevronRight size={24} className="text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
