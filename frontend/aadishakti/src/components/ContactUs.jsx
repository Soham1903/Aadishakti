import React, { useRef } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from './Home/SectionHeading';

export default function Contact() {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email handling logic here
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "फोन",
      details: ["+91 9130755631", "+91 96571 96333"]
    },
    {
      icon: Mail,
      title: "ईमेल",
      details: ["adishaktigurukul@gmail.com"]
    },
    {
      icon: MapPin,
      title: "पत्ता",
      details: ["333, डी, सोपाननगर", "सासवड, महाराष्ट्र 412301"]
    },
    {
      icon: Clock,
      title: "कार्यालय वेळ",
      details: ["सोमवार - शनिवार: सकाळी ९ ते सायंकाळी ७", "रविवार: बंद"]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="संपर्क साधा"
          subtitle="आपल्या आध्यात्मिक प्रवासाची सुरुवात करा"
        />

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-y-8 mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#791317]/10 flex items-center justify-center text-[#87161A]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-slate-800 mb-2">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-medium text-slate-800 mb-4">सोशल मीडिया</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#791317]/10 text-[#87161A] p-3 rounded-lg hover:bg-[#791317]/20 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.youtube.com/@aadishaktigurukul8441"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#791317]/10 text-[#87161A] p-3 rounded-lg hover:bg-[#791317]/20 transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-medium text-slate-800 mb-6">आम्हाला संदेश पाठवा</h3>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">पूर्ण नाव</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#87161A] focus:border-transparent"
                  placeholder="तुमचं नाव"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ईमेल पत्ता</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#87161A] focus:border-transparent"
                  placeholder="tumcha@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">फोन नंबर</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#87161A] focus:border-transparent"
                  placeholder="तुमचा फोन नंबर"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">सेवेची आवड</label>
                <select
                  name="service"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#87161A] focus:border-transparent"
                >
                  <option value="">सेवा निवडा</option>
                  <option value="रेकी हिलिंग">रेकी हिलिंग</option>
                  <option value="वास्तुशास्त्र">वास्तुशास्त्र</option>
                  <option value="हिप्नोथेरपी">हिप्नोथेरपी</option>
                  <option value="ज्योतिष">ज्योतिष</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">तुमचा संदेश</label>
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#87161A] focus:border-transparent h-32"
                  placeholder="आम्ही तुम्हाला कसा मदत करू शकतो?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#791317] text-white py-3 rounded-lg hover:bg-[#87161A] transition-colors"
              >
                संदेश पाठवा
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}