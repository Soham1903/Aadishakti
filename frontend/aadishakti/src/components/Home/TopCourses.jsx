import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#921a40',
        borderRadius: '50%',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" style={{ color: 'white' }}></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#921a40',
        borderRadius: '50%',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" style={{ color: 'white' }}></i>
    </div>
  );
};

const books = [
  {
    id: 1,
    name: 'The Secret Language of Astrology',
    price: '$29.99',
    description: 'This is the description for Book 1.',
    image: '/assets/book1-removebg-preview.png', // Path to image in public/assets
  },
  {
    id: 2,
    name: 'Astrology for the Soul',
    price: '$39.99',
    description: 'This is the description for Book 2.',
    image: '/assets/book1-removebg-preview.png', // Path to image in public/assets
  },
  {
    id: 3,
    name: 'The Only Astrology Book ',
    price: '$49.99',
    description: 'This is the description for Book 3.',
    image: '/assets/book1-removebg-preview.png', // Path to image in public/assets
  },
  {
    id: 4,
    name: 'Astrology: A Cosmic Science',
    price: '$59.99',
    description: 'This is the description for Book 4.',
    image: '/assets/book1-removebg-preview.png', // Path to image in public/assets
  },
];

const TopSellingCourses = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Set autoplay speed to 3 seconds
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#fff6f3] py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Top Selling Astrology Books</h2>
        <Slider {...settings}>
          {books.map((book) => (
            <div key={book.id} className="px-4">
              <div className="bg-[#fff6f3] p-6 rounded-lg shadow-lg text-center h-full flex flex-col">
                {/* Book Image */}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-t-lg flex-shrink-0">
                  <img
                    src={book.image} // Use the image path from public/assets
                    alt={book.name}
                    className="w-full h-full object-contain" // Ensure the image fits well
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 flex-grow">{book.name}</h3>
                <p className="text-gray-600 mb-4">{book.price}</p>
                <button
                  className="bg-[#921a40] text-white px-4 py-2 rounded hover:bg-[#7a1535] transition-colors"
                >
                  View Description
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopSellingCourses;
