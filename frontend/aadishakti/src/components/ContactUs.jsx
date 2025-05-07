import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Send
} from 'react-feather';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-20">
            <motion.h1
              className="text-5xl font-bold text-[#921a40] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              आपल्या आध्यात्मिक प्रवासाची सुरुवात करा
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              रूपांतराच्या दिशेने पहिला पाऊल टाका. मार्गदर्शन आणि समर्थनासाठी आमच्याशी संपर्क साधा.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column: Contact Info + Social */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
              {[{
                Icon: Phone, title: "फोन", details: ["+91 9876543210", "+91 9123456789"]
              }, {
                Icon: Mail, title: "ईमेल", details: ["contact@astrologyhealing.com", "support@astrologyhealing.com"]
              }, {
                Icon: MapPin, title: "पत्ता", details: ["१२३ आध्यात्मिक लेन", "मिस्टिक सिटी, एमसी १२३४५"]
              }, {
                Icon: Clock, title: "कार्यालय वेळ", details: ["सोमवार - शनिवार: सकाळी ९ ते सायंकाळी ७", "रविवार: बंद"]
              }].map(({ Icon, title, details }, i) => (
                <motion.div
                  key={i}
                  className="flex items-start space-x-6"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#921a40]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    {details.map((line, i) => (
                      <p key={i} className="text-gray-600">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6">आमच्याशी सोशल मीडियावर जोडा</h3>
              <div className="grid grid-cols-4 gap-4">
                {[{
                  icon: <Instagram />, label: "इंस्टाग्राम"
                }, {
                  icon: <Facebook />, label: "फेसबुक"
                }, {
                  icon: <Twitter />, label: "ट्विटर"
                }, {
                  icon: <Youtube />, label: "यूट्यूब"
                }].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-purple-50 transition-colors duration-300"
                  >
                    <div className="text-[#921a40] mb-2">{social.icon}</div>
                    <span className="text-sm text-gray-600">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-8 text-[#921a40]">आम्हाला संदेश पाठवा</h3>
              <form className="space-y-6">
                {[
                  { label: "पूर्ण नाव", type: "text", placeholder: "तुमचं नाव" },
                  { label: "ईमेल पत्ता", type: "email", placeholder: "tumcha@email.com" },
                  { label: "फोन नंबर", type: "tel", placeholder: "तुमचा फोन नंबर" }
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#921a40] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                ))}
                {/* Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">सेवेची आवड</label>
                  <motion.select
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#921a40] focus:border-transparent transition-all duration-300"
                  >
                    <option value="">सेवा निवडा</option>
                    <option value="reiki">रेकी हिलिंग</option>
                    <option value="vastu">वास्तुशास्त्र</option>
                    <option value="hypno">हिप्नोथेरपी</option>
                    <option value="astro">ज्योतिष</option>
                  </motion.select>
                </div>
                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">तुमचा संदेश</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#921a40] focus:border-transparent transition-all duration-300 h-32"
                    placeholder="आम्ही तुम्हाला कसा मदत करू शकतो?"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#921a40] to-[#7a1635] text-white py-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>संदेश पाठवा</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl overflow-hidden shadow-lg h-[400px]"
        >
          <iframe
            title="Google Map"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.894325603088!2d74.01959857700164!3d18.352104829739663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3c725f0cb70ef%3A0x23ea573e93368c07!2sShiv%20Mandir!5e0!3m2!1sen!2sin!4v1683226940416!5m2!1sen!2sin"
          />
        </motion.div>
      </div>
    </div>
  );
}
