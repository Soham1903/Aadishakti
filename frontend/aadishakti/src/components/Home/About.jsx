import React from 'react';
import { Star, Sparkles, Users } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'विविध गुढ शास्त्रांच्या कार्यशाळा',
      description: 'ऑनलाईन आणि ऑफलाइन पद्धतीने विविध गुढ शास्त्रांच्या कार्यशाळा. ज्योतिष, अंकशास्त्र, वास्तुशास्त्र यांचे सखोल ज्ञान मिळवा.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'ज्योतिष शास्त्र सल्ला',
      description: 'ज्योतिष शास्त्र विषयक सल्ला व मार्गदर्शन. जन्मपत्रिका विश्लेषण आणि ग्रहांचा आपल्या जीवनावरील प्रभाव जाणून घ्या.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'अंकशास्त्र मार्गदर्शन',
      description: 'अंकशास्त्र विषयक सल्ला व मार्गदर्शन. आपल्या जन्मतारखेनुसार आपले भाग्यांक, मूलांक आणि नामांक यांचे विश्लेषण.'
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            आमच्या सशुल्क सेवा
          </h2>
          <div className="w-24 h-1 bg-[#921a40] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Section - should come first on mobile */}
          <div className="space-y-8 order-1 md:order-1">
            {services.map((service, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#921a40]/10 flex items-center justify-center text-[#921a40]">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}

            <button className="mt-8 px-8 py-3 bg-[#921a40] text-white rounded-lg hover:bg-[#7a1635] transition-colors">
              अपॉइन्टमेंट बुक करा
            </button>
          </div>

          {/* Image Section - should come second on mobile */}
          <div className="order-2 md:order-2">
            <img 
              src="assets/astrobook.jpg"
              alt="Astrology Services"
              className="rounded-lg shadow-lg w-full h-48 md:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
