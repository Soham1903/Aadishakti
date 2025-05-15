import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  Eye,
  DollarSign,
  Calendar,
  User,
  Book,
} from "lucide-react";

const TransactionsDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/transaction/get"
        );
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        toast.error("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const toggleVerification = async (transactionId, currentStatus) => {
    try {
      const response = await fetch(
        `https://aadishakti-backend-ue51.onrender.com/api/transaction/${transactionId}/verify`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isVerified: !currentStatus }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setTransactions(
          transactions.map((t) =>
            t._id === transactionId ? data.updatedTransaction : t
          )
        );
        toast.success(
          `Transaction ${!currentStatus ? "verified" : "unverified"}`
        );
      }
    } catch (error) {
      toast.error("Failed to update verification status");
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f9f3f5]">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-[#87161a] animate-spin" />
          <span className="text-lg font-medium text-[#87161a]">
            Loading transactions...
          </span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f9f3f5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#87161a] mb-4">
            Transactions Dashboard
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87161a] focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-medium text-gray-500">
                  ID: {transaction.transactionId}
                </div>
                {transaction.isVerified ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <XCircle className="w-4 h-4 mr-1" />
                    Pending
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-[#87161a] mr-2" />
                  <span className="text-gray-700">
                    {transaction.customerName}
                  </span>
                </div>

                <div className="flex items-center">
                  <Book className="w-5 h-5 text-[#87161a] mr-2" />
                  <div className="text-gray-700 flex flex-col">
                    {(() => {
                      console.log(typeof transaction.courseTitle);
                      const courseTitles = Array.isArray(
                        transaction.courseTitle
                      )
                        ? transaction.courseTitle
                        : transaction.courseTitle
                        ? [transaction.courseTitle]
                        : [];

                      console.log(transaction);

                      if (!courseTitles.length) {
                        console.log(transaction);
                        return <span>Course title not available</span>;
                      }

                      courseTitles.forEach((title, index) => {
                        console.log(`Course ${index + 1}: ${title}`);
                      });

                      return courseTitles.map((title, index) => (
                        <span key={index}>
                          {index + 1}. {title}
                        </span>
                      ));
                    })()}
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-[#87161a] mr-2" />
                  <span className="text-gray-700">
                    Original: ${transaction.originalPrice} | Final: $
                    {transaction.finalPrice}
                    {transaction.promoCode && (
                      <span className="ml-2 text-sm text-gray-500">
                        (Promo: {transaction.promoCode})
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-[#87161a] mr-2" />
                  <span className="text-gray-700">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {transaction.paymentProof?.imageBase64 ? (
                    <div className="relative group">
                      <img
                        src={`data:${transaction.paymentProof.contentType};base64,${transaction.paymentProof.imageBase64}`}
                        alt="Payment proof"
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer transition-transform transform group-hover:scale-105"
                        onClick={() =>
                          setExpandedImage({
                            src: `data:${transaction.paymentProof.contentType};base64,${transaction.paymentProof.imageBase64}`,
                            alt: `Payment proof for ${transaction.customerName}`,
                          })
                        }
                      />
                      <Eye className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <span className="text-gray-400">No payment proof</span>
                  )}

                  <button
                    onClick={() =>
                      toggleVerification(
                        transaction._id,
                        transaction.isVerified
                      )
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      transaction.isVerified
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-[#87161a] hover:bg-[#7a1635] text-white"
                    }`}
                  >
                    {transaction.isVerified ? "Unverify" : "Verify"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {expandedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full bg-white rounded-xl p-2">
              <img
                src={expandedImage.src}
                alt={expandedImage.alt}
                className="max-w-full max-h-[80vh] rounded-lg"
              />
              <button
                className="absolute -top-4 -right-4 bg-[#87161a] text-white rounded-full p-2 shadow-lg hover:bg-[#7a1635] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedImage(null);
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsDashboard;
