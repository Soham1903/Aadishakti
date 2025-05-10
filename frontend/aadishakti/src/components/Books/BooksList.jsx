import React from 'react';
import { useNavigate } from 'react-router-dom';
import { books } from './data';

const BooksList = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Books</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-64 object-cover"
              onError={(e) => {
                const target = e.target;
                target.src = 'https://via.placeholder.com/300x450?text=Book+Cover';
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              <p className="text-lg font-bold text-[#921a40] mb-4">₹{book.price}</p>
              <button
                onClick={() => navigate(`/book/${book.id}`)}
                className="w-full py-2 px-4 bg-[#921a40] text-white font-semibold rounded-md hover:bg-[#7a1634] transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;