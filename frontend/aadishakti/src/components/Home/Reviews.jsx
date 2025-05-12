import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      position: "गृहिणी",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

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
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          आमच्या विद्यार्थ्यांचा अभिप्राय
        </h2>

        <div className="relative">
          {/* <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#87161a] opacity-20">
            <Quote size={80} />
          </div> */}

          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-2xl mx-auto text-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-[110px] h-[110px] rounded-full mx-auto mb-4 object-cover"
                    />
                    <div className="flex justify-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-lg italic mb-6">
                      {review.text}
                    </p>
                    <h4 className="font-semibold text-lg">{review.name}</h4>
                    <p className="text-gray-500">{review.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#87161a]" />
          </button>

          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-[#87161a]" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[#87161a]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
