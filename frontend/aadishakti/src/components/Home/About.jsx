import React from "react";
import { Star, Sparkles, Users, Phone, Home } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const About = () => {
  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "विविध गुढ शास्त्रांच्या कार्यशाळा",
      description:
        "ज्योतिष शास्त्र, वास्तुशास्त्र, अंकशास्त्र, मोबाईल न्यूमरॉलॉजी, रेकी,  हिलिंग, संमोहन यासारख्या असंख्य विषयांच्या कार्यशाळा चा माध्यमातून सखोल ज्ञान.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "ज्योतिष शास्त्र सल्ला",
      description:
        "ज्योतिष शास्त्र विषयक सल्ला व मार्गदर्शन. जन्मपत्रिका विश्लेषण आणि ग्रहांचा आपल्या जीवनावरील प्रभाव जाणून घ्या.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "अंकशास्त्र मार्गदर्शन",
      description:
        "आपल्या जन्मतारखेनुसार भाग्यांक, मुलांक, नामांक याचे विश्लेषण व नावात बदल सखोल मार्गदर्शन आणि कार्यशाळा.",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "मोबाईल नंबर सल्ला व मार्गदर्शन",
      description:
        "आपल्या मोबाईल नंबर मुळे जीवनावर होणारा चांगला, वाईट परिणाम व भाग्यकारक मोबाईल नंबर मुळे मिळणारे फायदे जाणून घ्या मार्गदर्शन आणि कार्यशाळा द्वारे.",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "भाग्यकारक स्क्रीन लॉक पासवर्ड मार्गदर्शन",
      description:
        "भाग्यकारक स्क्रीन लॉक पासवर्ड मुळे अनेक चांगले परिणाम मिळवण्यासाठी सल्ला व मार्गदर्शन.",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "टॅरो कार्ड नुसार मार्गदर्शन",
      description:
        "तुमच्या प्रश्नांची उत्तरे मिळवण्यासाठी टॅरो कार्ड मार्गदर्शन आणि कार्यशाळा सुद्धा आहेत.",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "वास्तुशास्त्र मार्गदर्शन",
      description:
        "घर ऑफिस दुकान इंडस्ट्रीज इत्यादींसाठी वास्तुशास्त्रानुसार व तुमच्या बजेटनुसार योग्य मार्गदर्शन व उपाय योजना.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <SectionHeading
          title="आमच्या सशुल्क सेवा"
          subtitle="खास सेवांद्वारे आपल्या जीवनात सकारात्मक बदल घडवा"
        />

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Service List */}
          <div className="space-y-8 order-1 md:order-1">
            {services.map((service, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#791317]/10 flex items-center justify-center text-[#87161A]">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-slate-800">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/919130755631?text=Hi%20I%20would%20like%20to%20book%20an%20appointment!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="mt-8 px-8 py-3 bg-[#791317] text-white rounded-lg hover:bg-[#87161A] transition-colors">
                अपॉइन्टमेंट बुक करा
              </button>
            </a>
          </div>

          {/* Image Section */}
          <div className="order-2 md:order-2 h-full flex items-center">
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
