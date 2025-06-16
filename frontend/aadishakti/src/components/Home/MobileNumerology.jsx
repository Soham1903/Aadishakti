import React from "react";
import { Phone, Lock } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const MobileNumerology = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="मोबाईल नंबर न्यूमरॉलॉजी"
          subtitle="तुमच्या मोबाईल नंबरमधून जाणून घ्या तुमच्या जीवनातील भविष्य"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content - Information */}
          <div className="space-y-8">
            <div className="bg-slate-50 rounded-xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#87161A]/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-[#87161A]" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-800 mb-2">
                    मोबाईल नंबर आपल्या जीवनावर कसा परिणाम करतो?
                  </h3>
                  <p className="text-slate-600">
                    तुमचा मोबाईल नंबर केवळ संपर्कासाठी नाही, तर आपल्या जीवनाच्या
                    विविध पैलूंवर प्रभाव टाकतो.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                {[
                  "तुमच्या मोबाईल नंबर मधील अंकांचा तुमच्या व्यक्तिमत्वावर प्रभाव",
                  "मोबाईल नंबरच्या ऊर्जेचा तुमच्या करिअरवर होणारा परिणाम",
                  "अंकशास्त्रानुसार तुमच्या आर्थिक स्थितीवर नंबरचा प्रभाव",
                  "भाग्यकारक पॅटर्न लॉक पासवर्ड द्वारे सकारात्मक ऊर्जा",
                  "विवाह, जॉब, व्यवसाय, धनसंपत्ती, नातेसंबंध, यामध्ये सुधारणा.",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[#B85C5C] mt-1">
                      <div className="w-4 h-4 bg-[#B85C5C] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <p className="text-slate-700">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/919130755631?text=Hi%20I%20would%20like%20to%20book%20an%20appointment!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#791317] text-white rounded-lg hover:bg-[#87161A] transition-colors"
                >
                  अपॉइन्टमेंट बुक करा
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#791317]/10 to-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-medium text-slate-800 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-[#87161a]/80 rounded-full mr-3 inline-block"></span>
                तुमचे भाग्य तुमच्या अंकांमध्ये दडलेले आहे
              </h3>
              <p className="text-slate-600 leading-relaxed">
                आजच तुमच्या मोबाईल नंबरचे विश्लेषण करून, जाणून घ्या तुमच्या
                जीवनातील सकारात्मक आणि नकारात्मक प्रभावांबद्दल. आमच्या तज्ञ
                अंकशास्त्रज्ञाकडून मार्गदर्शन घ्या.
              </p>
            </div>
          </div>

          {/* Right Content - Pattern Examples */}
          <div className="lg:pl-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
              <div className="aspect-video overflow-hidden relative">
                <img
                  src="assets/carousel/स्क्रीन लॉक.jpg"
                  alt="Mobile Numerology"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-5 w-5 text-[#87161A]" />
                  <h3 className="text-lg font-medium text-slate-800">
                    भाग्यकारक पॅटर्न उदाहरणे
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <PatternExample pattern={[1, 2, 3, 5, 7]} />
                  <PatternExample pattern={[1, 5, 9, 8, 7]} />
                  <PatternExample pattern={[2, 5, 8, 9, 6]} />
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700 text-sm md:text-lg">
                    <span className="font-mediumc font-bold">
                      वैज्ञानिक तथ्य:
                    </span>{" "}
                    भाग्यकारक पासवर्ड वापरल्याने तुमच्या जीवनात आणि इन्कम मध्ये
                    दहा टक्के वाढ होऊ शकते. अनेक लोकांच्या अनुभवावरून हे सिद्ध
                    झाले आहे.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    9: { x: 2, y: 2 },
  };

  return (
    <div className="bg-[#87161A]/5 rounded-lg p-3 hover:bg-[#87161A]/10 transition-all relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            className={`rounded-full aspect-square flex items-center justify-center text-xs ${
              pattern.includes(num)
                ? "bg-[#87161A] text-white font-bold"
                : "bg-[#87161A]/10 text-[#87161A]"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Connecting Lines */}
      <svg
        className="w-full h-full absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {pattern.map((num, i) => {
          if (i === pattern.length - 1) return null;
          const start = positions[num];
          const end = positions[pattern[i + 1]];
          return (
            <line
              key={i}
              x1={start.x * 33.33 + 16.67}
              y1={start.y * 33.33 + 16.67}
              x2={end.x * 33.33 + 16.67}
              y2={end.y * 33.33 + 16.67}
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