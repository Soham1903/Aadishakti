import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "./data";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInSection } from "../Home/FadeInSection";
import { SectionHeading } from "../Home/SectionHeading";


const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));

  const handleBuy = () => {
    navigate("/buybook", { state: { book } });
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-white pt-[80px] sm:pt-[90px] md:pt-[100px] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            Book not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#87161a] text-white rounded-lg hover:bg-[#87161a]/90 transition-colors duration-200"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[80px] sm:pt-[90px] md:pt-[100px] pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-[#87161a] mb-8 hover:text-[#87161a]/80 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Books
        </button>

        <FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="lg:col-span-4"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#87161a]/10 to-[#87161a]/30 rounded-xl blur"></div>
                <div className="relative overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="lg:col-span-8"
            >
              <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100 h-full">
                <div className="space-y-4">
                  <h1 className="text-2xl font-semibold text-slate-800 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-[#87161a]/80 text-lg mb-4">
                    {book.author}
                  </p>
                  <p className="text-3xl font-bold text-[#87161a] mb-8">
                    ₹ {book.price}
                  </p>

                  <button
                    className="w-full px-4 py-3 bg-[#87161a] hover:bg-[#87161a]/90 text-white rounded-lg font-semibold transition-colors duration-200"
                    onClick={handleBuy}
                  >
                    Buy Now
                  </button>

                  <div className="space-y-4 text-slate-600 leading-relaxed mt-8">
                    <h2 className="text-xl font-medium text-slate-800 mb-4">Description</h2>
                    <p>{book.description}</p>
                  </div>

                  <div className="bg-slate-50/50 rounded-lg p-6 mt-8">
                    <h2 className="text-xl font-medium text-slate-800 mb-4">Book Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
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
            </motion.div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default BookDetails;