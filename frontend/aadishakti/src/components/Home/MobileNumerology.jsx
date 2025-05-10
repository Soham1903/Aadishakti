import React, { useState } from 'react';
import { Search, Lock, Phone, Star, ArrowRight } from 'lucide-react';

const MobileNumerology = () => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/Appointment?number=${mobileNumber}`;
  };

  return (
    <section className="w-full bg-white text-[#333] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-2">
              <Phone className="h-7 w-7 text-[#87161A]" />
              <h2 className="text-3xl md:text-4xl font-bold">मोबाईल नंबर न्यूमरोलॉजी</h2>
            </div>

            <div className="space-y-4 text-lg">
              {[
                "जाणून घ्या तुमचा मोबाईल नंबर काय सांगतो?",
                "तुमच्या मोबाईल नंबर मुळे तुमच्या जीवनात काय घडत आहे!",
                "आणि मिळवा भाग्यकारक पॅटर्न लॉक पासवर्ड! भाग्यकारक पासवर्ड मुळे तुमच्या जीवनात आणि इन्कम मध्ये दहा टक्के वाढ होते असा अनुभव आहे."
              ].map((text, idx) => (
                <p key={idx} className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-[#87161A] mt-1 flex-shrink-0" />
                  <span>{text}</span>
                </p>
              ))}
              <p className="text-[#921a40] font-semibold mt-4">अपॉइन्टमेंट आवश्यक</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="bg-gray-100 p-1 rounded-lg flex items-center shadow-inner">
                <input
                  type="text"
                  placeholder="तुमचा मोबाईल नंबर टाका"
                  className="bg-transparent border-none outline-none px-4 py-3 w-full text-black placeholder-gray-500"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={10}
                />
                <button
                  type="submit"
                  className="bg-[#87161A] text-white font-bold px-5 py-3 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <span>शोधा</span>
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Content */}
          <div className="md:w-1/2">
            <div className="bg-gray-100 rounded-xl overflow-hidden relative shadow-lg">
              <img
                src="/assets/mobilenumber.jpg"
                alt="Mobile Numerology"
                className="w-full h-64 object-cover object-center"
              />


              <div className="p-6 space-y-6 relative z-10">
                <div className="flex items-center gap-2">
                  <Lock className="h-6 w-6 text-[#87161A]" />
                  <h3 className="text-2xl font-bold">भाग्यकारक पॅटर्न</h3>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <PatternExample pattern={[1, 2, 3, 5, 7]} />
                  <PatternExample pattern={[1, 5, 9, 8, 7]} />
                  <PatternExample pattern={[2, 5, 8, 9, 6]} />
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#921a40]/20">
                  <p className="text-center">
                    तुमच्या मोबाईल नंबर मधील अंकांच्या आधारे तुमचे व्यक्तिमत्व, करिअर आणि आरोग्य याबद्दल महत्वपूर्ण माहिती मिळू शकते.
                  </p>
                  {/* <div className="flex justify-center mt-4">
                    <button className="flex items-center gap-2 bg-[#87161A] text-white px-4 py-2 rounded-lg hover:bg-[#7a1736] transition-all">
                      <span>अधिक जाणून घ्या</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Numbers */}
        <div className="mt-16 relative overflow-hidden py-4">
          <div className="absolute inset-0 flex justify-around opacity-10 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="text-6xl font-bold animate-float"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  transform: `translateY(${Math.sin(i) * 20}px)`,
                  color: '#921a40'
                }}
              >
                {(i % 9) + 1}
              </div>
            ))}
          </div>
          <div className="text-center relative z-10">
            <p className="text-xl">तुमचे भाग्य तुमच्या अंकांमध्ये दडलेले आहे</p>
            <p className="text-sm mt-2 opacity-75">आज नंबर शोधून तुमच्या जीवनात सकारात्मक बदल घडवून आणा</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pattern Grid (Optional background grid)
const PatternGrid = () => {
  return (
    <div className="grid grid-cols-9 gap-1 h-full w-full">
      {Array.from({ length: 81 }).map((_, i) => (
        <div key={i} className="bg-[#921a40]/10 rounded-full aspect-square"></div>
      ))}
    </div>
  );
};

// Pattern Example Component
const PatternExample = ({ pattern }) => {
  const positions = {
    1: { x: 0, y: 0 },
    2: { x: 1, y: 0 },
    3: { x: 2, y: 0 },
    4: { x: 0, y: 1 },
    5: { x: 1, y: 1 },
    6: { x: 2, y: 1 },
    7: { x: 0, y: 2 },
    8: { x: 1, y: 2 },
    9: { x: 2, y: 2 }
  };

  return (
    <div className="bg-[#921a40]/5 rounded-lg p-3 hover:bg-[#921a40]/10 transition-all relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            className={`rounded-full aspect-square flex items-center justify-center text-xs ${
              pattern.includes(num) ? 'bg-[#87161A] text-white font-bold' : 'bg-[#921a40]/10 text-[#87161A]'
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Connecting Lines */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {pattern.map((num, i) => {
          if (i === pattern.length - 1) return null;
          const start = positions[num];
          const end = positions[pattern[i + 1]];
          return (
            <line
              key={i}
              x1={(start.x * 33.33) + 16.67}
              y1={(start.y * 33.33) + 16.67}
              x2={(end.x * 33.33) + 16.67}
              y2={(end.y * 33.33) + 16.67}
              stroke="#87161A"
              strokeWidth="2"
              opacity="0.6"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default MobileNumerology;
