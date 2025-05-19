import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, Youtube } from "react-feather";
import { Send } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ers13hl", // Replace with your EmailJS Service ID
        "template_cbuncbk", // Replace with your EmailJS Template ID
        form.current,
        "Q7Dti8zuYpQUGtgPS" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          alert("संदेश यशस्वीरित्या पाठविला गेला!");
          form.current.reset();
        },
        (error) => {
          alert("संदेश पाठवताना काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.");
          console.error(error);
        }
      );
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-20">
            <motion.h1
              className="text-4xl font-bold text-[#87161a] mb-6"
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
              रूपांतराच्या दिशेने पहिला पाऊल टाका. मार्गदर्शन आणि समर्थनासाठी
              आमच्याशी संपर्क साधा.
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
              {[
                {
                  Icon: Phone,
                  title: "फोन",
                  details: ["+91 9130755631", "+91 96571 96333"],
                },
                {
                  Icon: Mail,
                  title: "ईमेल",
                  details: ["adishaktigurukul@gmail.com"],
                },
                {
                  Icon: MapPin,
                  title: "पत्ता",
                  details: ["333, डी, सोपाननगर", "सासवड, महाराष्ट्र 412301"],
                },

                {
                  Icon: Clock,
                  title: "कार्यालय वेळ",
                  details: [
                    "सोमवार - शनिवार: सकाळी ९ ते सायंकाळी ७",
                    "रविवार: बंद",
                  ],
                },
              ].map(({ Icon, title, details }, i) => (
                <motion.div
                  key={i}
                  className="flex items-start space-x-6"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#87161a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    {details.map((line, i) => (
                      <p key={i} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            {/* Social Media Section */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg mt-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-[#87161a] mb-4">
                सोशल मिडिया
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-all duration-300"
                >
                  <Facebook className="text-blue-600 w-6 h-6" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all duration-300"
                >
                  <Youtube className="text-red-600 w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-8 text-[#87161a]">
                आम्हाला संदेश पाठवा
              </h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {[
                  {
                    label: "पूर्ण नाव",
                    type: "text",
                    placeholder: "तुमचं नाव",
                    name: "name",
                  },
                  {
                    label: "ईमेल पत्ता",
                    type: "email",
                    placeholder: "tumcha@email.com",
                    name: "email",
                  },
                  {
                    label: "फोन नंबर",
                    type: "tel",
                    placeholder: "तुमचा फोन नंबर",
                    name: "phone",
                  },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.name}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                ))}
                {/* Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    सेवेची आवड
                  </label>
                  <motion.select
                    name="service"
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-all duration-300"
                  >
                    <option value="">सेवा निवडा</option>
                    <option value="रेकी हिलिंग">रेकी हिलिंग</option>
                    <option value="वास्तुशास्त्र">वास्तुशास्त्र</option>
                    <option value="हिप्नोथेरपी">हिप्नोथेरपी</option>
                    <option value="ज्योतिष">ज्योतिष</option>
                  </motion.select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    तुमचा संदेश
                  </label>
                  <motion.textarea
                    name="message"
                    required
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#87161a] focus:border-transparent transition-all duration-300 h-32"
                    placeholder="आम्ही तुम्हाला कसा मदत करू शकतो?"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#87161a] to-[#7a1635] text-white py-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>संदेश पाठवा</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        {/* <motion.div
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
        </motion.div> */}
      </div>
    </div>
  );
}
