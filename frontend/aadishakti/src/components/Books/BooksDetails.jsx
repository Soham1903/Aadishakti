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
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-slate-100 h-full">
                <div className="space-y-6">
                  <h1 className="text-2xl font-semibold text-slate-800">
                    {book.title}
                  </h1>
                  <p className="text-[#87161a]/80 text-lg">
                    {book.author}
                  </p>
                  <p className="text-3xl font-bold text-[#87161a]">
                    ₹ {book.price}
                  </p>

                  <button
                    className="w-full px-4 py-3 bg-[#87161a] hover:bg-[#87161a]/90 text-white rounded-lg font-semibold transition-colors duration-200"
                    onClick={handleBuy}
                  >
                    Buy Now
                  </button>

                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <h2 className="text-xl font-medium text-slate-800">Description</h2>
                    <p>{book.description}</p>
                  </div>

                  <div className="bg-slate-50/50 rounded-lg p-5 sm:p-6">
                    <h2 className="text-xl font-medium text-slate-800 mb-4">Book Details</h2>
                    <div className="grid grid-cols-1 gap-4 text-slate-600">
                      <div className="flex flex-wrap items-center">
                        <span className="font-medium min-w-[80px] mr-2">Pages:</span> 
                        <span className="flex-1">{book.pages}</span>
                      </div>
                      <div className="flex flex-wrap items-center">
                        <span className="font-medium min-w-[80px] mr-2">Language:</span> 
                        <span className="flex-1">{book.language}</span>
                      </div>
                      <div className="flex flex-wrap items-center">
                        <span className="font-medium min-w-[80px] mr-2">Publisher:</span> 
                        <span className="flex-1 break-words">{book.publisher}</span>
                      </div>
                      <div className="flex flex-wrap items-center">
                        <span className="font-medium min-w-[80px] mr-2">Format:</span> 
                        <span className="flex-1">{book.format}</span>
                      </div>
                      <div className="flex flex-wrap items-center">
                        <span className="font-medium min-w-[80px] mr-2">ISBN:</span> 
                        <span className="flex-1 break-words">{book.isbn}</span>
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