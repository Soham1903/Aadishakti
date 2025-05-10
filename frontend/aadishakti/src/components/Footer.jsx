import React from 'react';
import { Phone, Mail, MapPin, Box } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#87161A] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="assets/logoo.jpeg"
                alt="Company Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <img 
                  src="assets/Adishakti TEXT.png"
                  alt="Numerology Text"
                  className="w-40 object-contain rounded-lg mt-1"
                />
              </div>
            </div>
            <p className="text-white/80 pr-4">
              तुमच्या जीवनातील महत्वपूर्ण निर्णयांसाठी अंकशास्त्राचा मार्गदर्शक
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">क्विक लिंक्स</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white/80 transition-colors duration-200">होम</a></li>
              <li><a href="/about" className="hover:text-white/80 transition-colors duration-200">आमच्याबद्दल</a></li>
              <li><a href="/contact" className="hover:text-white/80 transition-colors duration-200">संपर्क</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">सेवा</h4>
            <ul className="space-y-2">
              <li><a href="/reiki" className="hover:text-white/80 transition-colors duration-200">रेकी</a></li>
              <li><a href="/mobile-numerology" className="hover:text-white/80 transition-colors duration-200">मोबाईल न्यूमरोलॉजी</a></li>
              <li><a href="/tarot" className="hover:text-white/80 transition-colors duration-200">टॅरो रीडिंग</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">संपर्क</h4>
            <div className="space-y-3">
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>123, संत तुकाराम नगर, पुणे, महाराष्ट्र - 411001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+919876543210" className="hover:text-white/80 transition-colors duration-200">+91 98765 43210</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@numerology.com" className="hover:text-white/80 transition-colors duration-200">info@numerology.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <a href="/privacy-policy" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">प्रायव्हसी पॉलिसी</a>
            <a href="/terms" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">नियम आणि अटी</a>
            <a href="/security" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">सुरक्षा धोरण</a>
            <a href="/refund" className="text-white/80 hover:text-white transition-colors duration-200 text-sm">रिफंड धोरण</a>
          </div>
          <div className="text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} न्यूमरोलॉजी. सर्व हक्क राखीव.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;