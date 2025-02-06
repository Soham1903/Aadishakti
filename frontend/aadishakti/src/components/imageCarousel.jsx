import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/images");
        console.log(response.data); // Log entire response to check the image data
        setImages(response.data); // Set images from the response
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img._id}>
            {/* Ensure that imageBase64 and contentType are valid */}
            {img.contentType && img.imageBase64 ? (
              <img
                src={`data:${img.contentType};base64,${img.imageBase64}`}
                alt={img.filename}
                className="rounded-lg shadow-lg w-full"
              />
            ) : (
              <p>Image data is missing or invalid.</p>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
