import React from "react";
import { useNavigate } from "react-router-dom";
import { books } from "./data";

const BooksList = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-3xl font-bold text-[#87161a] mb-2 text-center">आमची पुस्तके विक्रीसाठी उपलब्ध</h1>
      <div className="w-24 h-1 bg-[#87161a] mx-auto mb-8"></div>

      <div className="flex flex-wrap justify-center gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md overflow-hidden w-72 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="h-64 p-4 flex items-center justify-center bg-gray-50">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full object-contain"
                onError={(e) => {
                  const target = e.target;
                  target.src =
                    "https://via.placeholder.com/300x450?text=Book+Cover";
                }}
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-bold text-slate-700 line-clamp-2 mb-1 h-14">
                {book.title}
              </h3>
              <p className="text-sm text-slate-600 mb-2 italic line-clamp-1">
                {book.author}
              </p>
              <p className="text-lg font-bold text-[#87161a] mb-4">
                ₹ {book.price}
              </p>
              <button
                onClick={() => navigate(`/book/${book.id}`)}
                className="mt-auto w-full py-2 px-4 bg-[#87161a] text-white font-semibold rounded-md hover:bg-[#7a1634] transition-colors duration-300"
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