import React from "react";
import { useNavigate } from "react-router-dom";
import { books } from "./data";
import { FadeInSection } from "../Home/FadeInSection";
import { SectionHeading } from "../Home/SectionHeading";

const BooksList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-[80px] sm:pt-[90px] md:pt-[100px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            title="आमची पुस्तके विक्रीसाठी उपलब्ध"
            center
            color="#87161a"
          />
        </FadeInSection>

        <FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="relative bg-white rounded-xl border border-slate-100 shadow-md transition-all duration-300 hover:scale-[1.05] hover:shadow-xl"
              >
                <div className="relative z-10 flex flex-col h-full p-4">
                  <div className="aspect-[2/3] bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center mb-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="object-contain h-full"
                      onError={(e) => {
                        const target = e.target;
                        target.src =
                          "https://via.placeholder.com/300x450?text=Book+Cover";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1 line-clamp-2 h-12">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-600 italic mb-2 line-clamp-1">
                    {book.author}
                  </p>
                  <p className="text-xl font-bold text-[#87161a] mb-4">
                    ₹ {book.price}
                  </p>
                  <button
                    onClick={() => navigate(`/book/${book.id}`)}
                    className="mt-auto w-full py-2 px-4 bg-[#87161a] text-white font-semibold rounded-md hover:bg-[#87161a]/90 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default BooksList;
