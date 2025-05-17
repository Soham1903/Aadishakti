import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "./data";
import { ArrowLeft } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));

  const handleBuy = () => {
    navigate("/buybook", { state: { book } });
  };

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Book not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#87161a] text-white rounded-xl hover:bg-[#7a1634] transition-colors duration-300"
        >
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-[#87161a] mb-8 hover:underline font-medium"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Books
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="md:flex gap-12">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="sticky top-8">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-xl shadow-md"
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {book.title}
            </h1>
            <p className="text-2xl text-gray-600 mb-4 italic">{book.author}</p>
            <p className="text-3xl font-bold text-[#87161a] mb-8">
              ₹ {book.price}
            </p>

            <button
              className="px-8 py-4 bg-[#87161a] text-white rounded-xl hover:bg-[#7a1634] transition-colors duration-300 font-semibold text-lg mb-12 w-full md:w-auto"
              onClick={handleBuy}
            >
              Buy Now
            </button>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {book.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Book Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Pages:</span> {book.pages}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Language:</span> {book.language}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Publisher:</span> {book.publisher}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Format:</span> {book.format}
                </div>
                <div className="flex items-center col-span-2">
                  <span className="font-medium mr-2">ISBN:</span> {book.isbn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;