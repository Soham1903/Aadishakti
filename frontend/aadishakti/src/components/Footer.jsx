import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const handleAddressClick = () => {
    const mapUrl =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30295.51158892893!2d73.99405990403132!3d18.3500694752919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ef88682aff03%3A0x8f1183045ce2366!2sSaswad%2C%20Maharashtra%20412301!5e0!3m2!1sen!2sin!4v1751105091897!5m2!1sen!2sin";
    window.open(mapUrl, "_blank");
  };

  return (
    <footer className="bg-[#87161A] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="assets/aadishaktipng.png"
                alt="Company Logo"
                className="w-12 h-12 object-cover"
              />
              <div className="flex flex-col">
                <img
                  src="assets/Adishakti TEXT logo.png"
                  alt="Numerology Text"
                  className="w-50 object-contain rounded-lg mt-1"
                />
              </div>
            </div>
            <p className="text-white/80 pr-4">
              तुमच्या जीवनातील महत्वपूर्ण निर्णयांसाठी आम्हाला संपर्क करा
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">क्विक लिंक्स</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white/80">होम</a></li>
              <li><a href="/about" className="hover:text-white/80">आमच्याबद्दल</a></li>
              <li><a href="/courses" className="hover:text-white/80">कोर्सेस</a></li>
              <li><a href="/books" className="hover:text-white/80">पुस्तके</a></li>
              <li><a href="/gallery" className="hover:text-white/80">गॅलरी</a></li>
              <li><a href="/contact" className="hover:text-white/80">संपर्क</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">सेवा</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white/80">रेकी</a></li>
              <li><a href="#mobile-numerology" className="hover:text-white/80">मोबाईल न्यूमरोलॉजी</a></li>
              <li><a href="#about" className="hover:text-white/80">टॅरो रीडिंग</a></li>
              <li><a href="#about" className="hover:text-white/80">ज्योतिष शास्त्र</a></li>
              <li><a href="#mobile-numerology" className="hover:text-white/80">स्क्रीन लॉक पासवर्ड</a></li>
              <li><a href="#vastu" className="hover:text-white/80">वास्तुशास्त्र मार्गदर्शन</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">संपर्क</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <button
                  onClick={handleAddressClick}
                  className="text-left hover:text-white/80 transition-colors duration-200 cursor-pointer"
                >
                  333, डी, सोपाननगर, सासवड, महाराष्ट्र 412301
                </button>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <a
                  href="tel:+919130755631"
                  className="hover:text-white/80 transition-colors duration-200"
                >
                  +91 9130755631
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:adishaktigurukul@gmail.com"
                  className="hover:text-white/80 transition-colors duration-200"
                >
                  adishaktigurukul@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <a href="/privacy-policy" className="text-white/80 hover:text-white text-sm">प्रायव्हसी पॉलिसी</a>
            <a href="/terms" className="text-white/80 hover:text-white text-sm">नियम आणि अटी</a>
            <a href="/security" className="text-white/80 hover:text-white text-sm">सुरक्षा धोरण</a>
            <a href="/refund" className="text-white/80 hover:text-white text-sm">रिफंड धोरण</a>
          </div>
          <div className="text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} आदिशक्ती गुरुकुल. सर्व हक्क राखीव.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
