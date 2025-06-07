import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "सौ.सुचेता गोडबोले",
      image: "/users/sucheta.jpg",
      rating: 5,
      text: "आदिशक्ती गुरुकुल च्या संस्थापिका सौ.चारुशीला ताई यांच्याकडे रेकी शिकत असताना अनेक सुंदर अनुभव आले. आणि आजही मी रेकी साधना करते. चारुशीला ताई अगदी मनापासून शिकवतात विद्यार्थ्यांकडून सराव करून घेतात. मॅडमच्या या कार्याला माझ्या खूप हार्दिक शुभेच्छा खूप खूप धन्यवाद आदिशक्ती गुरुकुल !",
      position: "गृहिणी",
    },
    {
      id: 2,
      name: "सौ.कुशल राकेश अंबाडे",
      image: "/users/kushal.jpg",
      rating: 5,
      text: "अनेक औषधे आणि थेरपी घेतले. परंतु अजिबात फरक पडला नाही. परंतु मॅडम च्या रेकी कार्यशाळा त्यावेळी आम्हाला प्रत्यक्ष करावी लागली. व आमच्या मुला मध्ये फार मोठा फरक पडला. आत्मविश्वास त्याच्यामध्ये निर्माण झाला. शाळेत शिक्षणात चांगली प्रगती झाली. त्यामुळे माझी डोक्यावरील एक समस्या कमी झाल. त्यामुळे मला रेकी शक्तीचा व मॅडमचा खूप खूप आधार वाटतो.",
      position: "वनविभाग अधिकारी",
    },
    {
      id: 3,
      name: "सौ.सुप्रिया वगळ ",
      image: "/users/female.jpg",
      rating: 4,
      text: "स्पर्श रेकी आणि दुसऱ्यांवर रेकी देण्याचे व्हिडीओ देखील खूपच प्रभावी आहेत. अद्याप मी त्यांची प्रत्यक्ष प्रॅक्टिस केलेली नाही, पण लवकरच करून अनुभव घेणार आहे. तुमचं मार्गदर्शन, शिकवलेली पद्धत आणि दिलेली उर्जा यासाठी तुम्हाला मनापासून धन्यवाद!",
      position: "ज्योतिषी",
    },
    {
      id: 4,
      name: "श्री.गुड्डया स्वामी ",
      image: "/users/swami.jpeg",
      rating: 4,
      text: "मॅडमनी सांगितल्याप्रमाणे भाग्यकारक मोबाईल नंबर घेतल्यामुळे माझे पैशाची आवक वाढली व त्यानंतर माझं घर बांधून झालं .माझ्या वडिलांची तब्येत सुद्धा व्यवस्थित नव्हती ती सुद्धा आता ओके आहे",
      position: "ज्योतिषी",
    },
    {
      id: 5,
      name: "सौ.लता पास्ते ",
      image: "/users/lata.jpeg",
      rating: 5,
      text: " मी रेकीचा क्लास केला. मला त्याचा खुपच फायदा झाला. सकाळी उठताना माझी कंबर खूप दु खायची. गेल्यावर्षी मला झिका वायरस ची लागण झाली होती. मी खूप औषधे घेतली अलोपथी. आयुर्वेदिक. होमिओपॅथी पण माझ्या हाताचे सांधे बोटाचे सांधे दुखतच होते. पण मी रोज एकवीस दिवस माझ्यावर रेकी घेतली आणि काय आश्चर्य माझ्या हाताचे दुखणे एकदम बंद झाले.",
      position: "गृहिणी",
    },
  ];

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // ⏱️ 15 seconds per card
  };

  const stopAutoPlay = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isPaused) {
      startAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isPaused, reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="आमच्या विद्यार्थ्यांचा अभिप्राय"
          subtitle="विद्यार्थ्यांच्या अनुभवातून जाणून घ्या आमच्या सेवांची गुणवत्ता"
        />

        <div className="mt-12 relative">
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm border border-slate-100 text-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-[#87161A]/10"
                    />
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-slate-700 text-lg italic mb-6 leading-relaxed">
                      "{review.text}"
                    </p>
                    <h4 className="font-medium text-lg text-slate-800">
                      {review.name}
                    </h4>
                    <p className="text-slate-600">{review.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-[#87161a]" />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-[#87161a]" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#87161a] w-6" : "bg-slate-300"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
