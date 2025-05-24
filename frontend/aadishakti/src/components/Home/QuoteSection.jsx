import React from 'react';
import { Quote } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#791317]/5 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative">
        {/* Decorative icons */}
        <div className="absolute top-0 left-0 opacity-10 text-[#87161a]">
          <Quote className="w-12 h-12 md:w-16 md:h-16 transform -scale-x-100" />
        </div>
        <div className="absolute bottom-0 right-0 opacity-10 text-[#87161a]">
          <Quote className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        <blockquote className="text-center relative z-10">
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-slate-700 mb-4 md:mb-6 leading-relaxed">
            ज्योतिष शास्त्र, वास्तुशास्त्र, अंकशास्त्र, मोबाईल न्यूमरॉलॉजी, टॅरो कार्ड, रेकी हे आणि यासारखे
            <br />
            <span className="text-[#791317] font-semibold">
              सर्व शास्त्र म्हणजे एकाच नाण्याच्या अनेक बाजू आहेत.
            </span>
          </p>
          <p className="text-base md:text-lg text-slate-600 mt-3 md:mt-4">
            या सर्व शास्त्रांच्या आधारावर मनुष्य योग्य निर्णय, योग्य उत्तर आणि योग्य मार्गदर्शन मिळवू शकतो.
          </p>
          <footer className="mt-6 md:mt-8">
            <div className="w-12 md:w-16 h-1 bg-[#791317] mx-auto mb-3"></div>
            <p className="text-base md:text-lg font-semibold text-slate-700">
              अशा या गुढ शास्त्रांना आदिशक्ती गुरुकुलचा नमस्कार असो!
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

export default QuoteSection;