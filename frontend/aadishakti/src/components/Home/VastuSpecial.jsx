import React from "react";
import { Home, ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const VastuSpecial = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="वास्तुशास्त्र मार्गदर्शन"
          subtitle="वैज्ञानिक पद्धतीचे वास्तुशास्त्र - विना तोडफोड सुख समृद्धी"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
          {/* Left Side - Image Grid */}
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
                    src="assets/vastuimg.jpg"
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
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-medium text-slate-800 mb-6 flex items-center">
              <span className="w-1.5 h-8 bg-[#87161a]/80 rounded-full mr-3 inline-block"></span>
              सुख समृद्धी आनंद मिळवा
            </h3>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
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
                "उपाययोजनांचा कमी खर्च जास्त फायदे",
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

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
              <h3 className="text-xl font-medium text-slate-800 mb-3 flex items-center">
                <Home className="h-5 w-5 text-[#87161a] mr-2" />
                वास्तू विशेष सेवा
              </h3>
              <p className="text-slate-600 leading-relaxed">
                आपल्या घर किंवा कार्यालयासाठी संपूर्ण वास्तु परीक्षण, दोष शोध
                आणि निवारणासाठी तज्ज्ञ मार्गदर्शनाची खास सेवा उपलब्ध आहे.
                सकारात्मक ऊर्जा, समृद्धी आणि शांततेसाठी आजच संपर्क साधा.
              </p>
            </div>

            <a
              href="https://wa.me/919130755631?text=Hi%20I%20would%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <button className="px-8 py-3 bg-[#791317] hover:bg-[#87161a] text-white font-medium rounded-lg transition-all flex items-center">
                अपॉइन्टमेंट बुक करा
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VastuSpecial;
