import React from 'react';
import { Star, Sparkles, Users, Phone, Home } from 'lucide-react';

const About = () => {
  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'विविध गुढ शास्त्रांच्या कार्यशाळा',
      description:
        'ऑनलाईन आणि ऑफलाइन पद्धतीने विविध गुढ शास्त्रांच्या कार्यशाळा. ज्योतिष, अंकशास्त्र, वास्तुशास्त्र यांचे सखोल ज्ञान मिळवा.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'ज्योतिष शास्त्र सल्ला',
      description:
        'ज्योतिष शास्त्र विषयक सल्ला व मार्गदर्शन. जन्मपत्रिका विश्लेषण आणि ग्रहांचा आपल्या जीवनावरील प्रभाव जाणून घ्या.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'अंकशास्त्र मार्गदर्शन',
      description:
        'अंकशास्त्र विषयक सल्ला व मार्गदर्शन. आपल्या जन्मतारखेनुसार आपले भाग्यांक, मूलांक आणि नामांक यांचे विश्लेषण.'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'मोबाईल नंबर शी संबंधित सल्ला व मार्गदर्शन',
      description:
        'आपल्या मोबाईल क्रमांकाचा प्रभाव, बदलाचा विचार आणि अनुकूलता याबाबत सखोल सल्ला.'
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: 'वास्तुशास्त्राशी संबंधित सल्ला व मार्गदर्शन',
      description:
        'घर, ऑफिस किंवा दुकानासाठी वास्तुशास्त्रानुसार योग्य मार्गदर्शन व उपाय.'
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4">
            आमच्या सशुल्क सेवा
          </h2>
          <div className="w-24 h-1 bg-[#87161A] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Section */}
          <div className="space-y-8 order-1 md:order-1">
            {services.map((service, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#791317]/10 flex items-center justify-center text-[#87161A]">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-700">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}

            <button className="mt-8 px-8 py-3 bg-[#791317] text-white rounded-lg hover:bg-[#87161A] transition-colors">
              अपॉइन्टमेंट बुक करा
            </button>
          </div>

          {/* Image Section */}
          <div className="order-2 md:order-2">
            <img
              src="assets/space.png"
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
