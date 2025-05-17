import React from "react";
import { Home, ArrowRight } from "lucide-react";

const VastuSpecial = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-[#87161a]/10 rounded-full blur-3xl"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src="assets/vastu/directiona.png"
                    alt="Vastu design"
                    className="rounded-lg shadow-lg mb-4 h-48 w-full object-cover"
                  />
                  <img
                    src="assets/vastu/home.jpg"
                    alt="Home interior"
                    className="rounded-lg shadow-lg h-64 w-full object-cover"
                  />
                </div>
                <div className="mt-8">
                  <img
                    src="assets/vastu/home2.jpg"
                    alt="Vastu elements"
                    className="rounded-lg shadow-lg mb-4 h-64 w-full object-cover"
                  />
                  <img
                    src="assets/vastu/home3.jpg"
                    alt="Interior design"
                    className="rounded-lg shadow-lg h-48 w-full object-cover"
                  />
                </div>
              </div>

              {/* <div className="absolute -bottom-10 -right-10 bg-white rounded-full p-6 shadow-xl">
                <div className="relative w-20 h-20 flex items-center justify-center bg-[#d4af37] rounded-full">
                  <Home className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 bg-[#d13a3f] rounded-full animate-ping opacity-20"></div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            {/* <div className="inline-flex items-center mb-4 bg-[#87161a]/10 px-4 py-1 rounded-full text-[#87161a]">
              <Home className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium text-slate-700">
                वास्तुशास्त्र विशेष
              </span>
            </div> */}

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-slate-800">
              वास्तुशास्त्र -{" "}
              <span className="text-[#87161a]">सल्ला व मार्गदर्शन</span>
            </h2>

            <p className="text-xl text-slate-700 mb-6">
              तुमच्या वास्तू मध्ये थोडेसे सहज होणारे विना तोडफोड बदल करा. आणि
              सुख समृद्धी आनंद मिळवा! समजून घ्या वास्तुशास्त्रामागील विज्ञान
              तेही वैज्ञानिक पद्धतीने!
            </p>

            <div className="space-y-4 mb-8">
              {[
                "घरातील वास्तूदोष ओळखणे",
                "व्यावसायिक स्थळासाठी वास्तू सल्ला",
                "वैज्ञानिक दृष्टिकोनातून वास्तू विश्लेषण",
                "साधे आणि प्रभावी वास्तू उपाय",
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-[#87161a]/10 p-2 rounded-full mr-4 text-[#87161a]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-md mb-10 max-w-3xl mx-auto">
              <h3 className="text-2xl font-extrabold text-[#87161a] mb-4">
                वास्तू विशेष सेवा
              </h3>
              <p className="text-lg leading-relaxed text-gray-800">
                1. आपल्या घर किंवा कार्यालयासाठी संपूर्ण वास्तु परीक्षण, दोष शोध
                आणि निवारणासाठी तज्ज्ञ मार्गदर्शनाची खास सेवा उपलब्ध आहे.{" "}
                <br className="hidden sm:inline" />
                2. सकारात्मक ऊर्जा, समृद्धी आणि शांततेसाठी आजच संपर्क साधा.
              </p>
            </div>

            <button className="px-8 py-3 bg-[#87161a] hover:bg-[#87161a] text-white font-semibold rounded-lg transition-all flex items-center">
              अपॉइन्टमेंट बुक करा
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VastuSpecial;
