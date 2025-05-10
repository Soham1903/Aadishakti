import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

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
                    src="https://images.pexels.com/photos/7214326/pexels-photo-7214326.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Vastu design"
                    className="rounded-lg shadow-lg mb-4 h-48 w-full object-cover"
                  />
                  <img 
                    src="https://images.pexels.com/photos/8134828/pexels-photo-8134828.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Home interior"
                    className="rounded-lg shadow-lg h-64 w-full object-cover"
                  />
                </div>
                <div className="mt-8">
                  <img 
                    src="https://images.pexels.com/photos/4450337/pexels-photo-4450337.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Vastu elements"
                    className="rounded-lg shadow-lg mb-4 h-64 w-full object-cover"
                  />
                  <img 
                    src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Interior design"
                    className="rounded-lg shadow-lg h-48 w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 bg-white rounded-full p-6 shadow-xl">
                <div className="relative w-20 h-20 flex items-center justify-center bg-[#87161a] rounded-full">
                  <Home className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 bg-[#87161a] rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center mb-4 bg-[#87161a]/10 px-4 py-1 rounded-full text-[#87161a]">
              <Home className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">वास्तुशास्त्र विशेष</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
              वास्तुशास्त्र - <span className="text-[#87161a]">सल्ला व मार्गदर्शन</span>
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              तुमच्या वास्तू मध्ये थोडेसे सहज होणारे विना तोडफोड बदल करा. आणि सुख समृद्धी आनंद मिळवा! समजून घ्या वास्तुशास्त्रामागील विज्ञान तेही वैज्ञानिक पद्धतीने!
            </p>

            <div className="space-y-4 mb-8">
              {[
                'घरातील वास्तूदोष ओळखणे',
                'व्यावसायिक स्थळासाठी वास्तू सल्ला',
                'वैज्ञानिक दृष्टिकोनातून वास्तू विश्लेषण',
                'साधे आणि प्रभावी वास्तू उपाय'
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-[#87161a]/10 p-2 rounded-full mr-4 text-[#87161a]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 mb-8">
              <h3 className="text-xl font-bold mb-3 text-gray-900">वास्तू विशेष सेवा</h3>
              <p className="text-gray-700 mb-3">
                तुमच्या घर किंवा कार्यालयासाठी संपूर्ण वास्तू परीक्षण आणि दोष निवारणासाठी विशेष मार्गदर्शन सेवा उपलब्ध आहे..
              </p>
              {/* <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">सीमित कालावधीसाठी 20% सवलत</span>
                <span className="font-bold text-[#87161a]">₹1,599</span>
              </div> */}
            </div>

            <button className="px-8 py-3 bg-[#87161a] hover:bg-[#7a1535] text-white font-semibold rounded-lg transition-all flex items-center">
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
