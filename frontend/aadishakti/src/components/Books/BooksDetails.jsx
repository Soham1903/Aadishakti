import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "./data";
import { ArrowLeft } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));
  console.log(book.coverImage);

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
          className="px-6 py-3 bg-[#87161a] text-white rounded-md hover:bg-[#7a1634]"
        >
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-[#87161a] mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2" />
        Back to Books
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="md:flex gap-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{book.author}</p>
            <p className="text-3xl font-bolder text-[#87161a] mb-6">
              ₹ {book.price}
            </p>

            <div className="flex gap-4 mb-8">
              <button
                className="px-6 py-2 bg-[#87161a] text-white rounded-md hover:bg-[#7a1634]"
                onClick={handleBuy}
              >
                Buy Now
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>Pages: {book.pages}</p>
              <p>Language: {book.language}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Format: {book.format}</p>
              <p>ISBN: {book.isbn}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
