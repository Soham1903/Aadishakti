import React from "react";
import { motion } from "framer-motion";
import { Target, BookOpen, HomeIcon, Star, BookText, Zap, Calculator, Phone } from "lucide-react";
import SectionTitle from "./SectionTitle";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutOrganization = () => {
  return (
    <div className="space-y-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <SectionTitle
          title="आदिशक्ती गुरुकुल"
          subtitle="संस्थेचा परिचय व उद्देश"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Left column - History */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#87161a]/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#87161a]/5 rounded-full -ml-20 -mb-20"></div>

            <div className="relative">
              <h3 className="text-2xl font-bold text-[#87161a] mb-6">
                संस्थेचा इतिहास
              </h3>

              <div className="space-y-4 text-gray-700">
                <p>
                  आदिशक्ती गुरुकुल ज्योतिष संशोधन केंद्र, सासवड, जि. पुणे. ची
                  स्थापना 2011 मध्ये केली.
                </p>

                <p>
                  आदिशक्ती गुरुकुलचे पूर्वीचे नाव आदिशक्ती वास्तु ज्योतिष आणि
                  ऊर्जा हीलिंग सेंटर असे होते. परंतु आदिशक्ती गुरुकुलच्या
                  माध्यमातून मोठ्या प्रमाणावर समाजाला कार्यशाळेमार्फत मार्गदर्शन
                  करण्याचे काम करत असल्यामुळे आमच्या संस्थेचे नाव 2019 मध्ये
                  आदिशक्ती गुरुकुल ज्योतिष संशोधन केंद्र, सासवड, जि. पुणे. असे
                  बदलण्यात आले.
                </p>

                <p>
                  2011 पासून वास्तु, ज्योतिष, रेकी, हीलिंग, अंकशास्त्र या सर्व
                  शास्त्रांच्या माध्यमातून सल्ला व मार्गदर्शनाचे काम चालू होते
                  परंतु त्याच बरोबर ठीक ठिकाणी जाऊन अनेक मोफत वास्तू व्हिजिट
                  केल्या व आम्ही शिकवत असलेल्या शास्त्राचा प्रसार आणि प्रचार
                  केला.
                </p>

                <p>
                  त्यानंतर पुणे, नाशिक, कोल्हापूर, सातारा, अहिल्यानगर यासारख्या
                  शहरातील हॉटेलमध्ये कार्यशाळा घेतल्या. त्यातून अनेक व्यक्तींना
                  मार्गदर्शन केले व त्या मार्फत अनेकांनी स्वतःचे व्यवसाय सुरु
                  केले.
                </p>

                <p>
                  वास्तुशास्त्र, रेकी, सम्मोहन, मॅजिक मनी मंत्रा, मनी रेकी,
                  मॅजिकल कॅश बॉक्स, ज्योतिष शास्त्र आणि अंकशास्त्र या विषयावरील
                  कार्यशाळा खूप गाजल्या. व त्यानंतर २०२० पासून ऑनलाईन
                  कार्यशाळाची मागणी वाढली. खरंतर त्यामुळे अनेक व्यक्तींना
                  शिकवण्याचे भाग्य आम्हाला मिळाले.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column - Mission & Vision */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#87161a] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#87161a]/5 rounded-full -mr-20 -mt-20"></div>

              <div className="relative">
                <div className="flex items-start mb-6">
                  <Target className="w-8 h-8 text-[#87161a] mr-4" />
                  <h3 className="text-2xl font-bold text-[#87161a]">उद्देश</h3>
                </div>

                <p className="text-gray-700 ml-12">
                  आमचे विविध विषय वैज्ञानिक पद्धतीने शिकवणे व जास्तीत जास्त
                  व्यक्तींपर्यंत त्यांचे फायदे पोहोचवणे तसेच गरजू व्यक्तींच्या
                  समस्या निर्मूलन करणे.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#87161a] overflow-hidden relative">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#87161a]/5 rounded-full -mr-20 -mb-20"></div>

              <div className="relative">
                <div className="flex items-start mb-6">
                  <BookOpen className="w-8 h-8 text-[#87161a] mr-4" />
                  <h3 className="text-2xl font-bold text-[#87161a]">
                    उद्दिष्ट
                  </h3>
                </div>

                <p className="text-gray-700 ml-12">
                  विविध कार्यशाळांच्या माध्यमातून समाजापर्यंत वैज्ञानिक
                  दृष्टिकोनातून सोप्या भाषेमध्ये आम्ही शिकवत असलेल्या सर्व
                  शास्त्रांचा प्रचार आणि प्रसार करणे तसेच ही सर्व शास्त्र म्हणजे
                  अंधश्रद्धा नाही तर विज्ञान आहे ही संकल्पना राबवणे.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Services */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="pt-8"
      >
        <SectionTitle
          title="आमची सेवा क्षेत्रे"
          subtitle="विविध विषयांच्या कार्यशाळा व मार्गदर्शन"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white mb-2">
                      <service.icon className="h-5 w-5 text-[#87161a]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#87161a] mb-2">
                  {service.title}
                </h3>
                <p className="text-lg font-semibold text-gray-700">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Services data with icons
const services = [
  {
    title: "वास्तुशास्त्र",
    description: "वैज्ञानिक पद्धतीचे वास्तुशास्त्र मार्गदर्शन व कार्यशाळा",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: HomeIcon
  },
  {
    title: "ज्योतिष",
    description: "वैज्ञानिक दृष्टिकोनातून ज्योतिष शास्त्राचे मार्गदर्शन",
    image: "https://vedicfeed.com/wp-content/uploads/2018/12/Jyotish-Shastra-Facts.jpg",
    icon: Star
  },
  {
    title: "रेकी हीलिंग",
    description: "प्राचीन उर्जा उपचार पद्धती व प्रशिक्षण",
    image:
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: Zap
  },
  {
    title: "संमोहन",
    description: "स्वसंमोहन, क्लिनिकल हिप्नोसिस आणि मॅजिकल हिप्नोसिस",
    image: "https://www.psychologs.com/wp-content/uploads/2023/06/Hypnosis-2.jpg",
    icon: BookText
  },
  {
    title: "अंकशास्त्र",
    description: "अंकशास्त्र आणि मोबाईल न्यूमरॉलॉजी",
    image: "https://assets.mypandit.com/wp-content/uploads/2025/02/numerology-charts.webp",
    icon: Calculator
  },
  {
    title: "मोबाईल न्यूमरॉलॉजी",
    description: "मोबाईल नंबर विश्लेषण आणि त्याचे प्रभाव",
    image: "https://assets.askganesha.com/ae/50ed1d8eefcdd897d2238a5bf6ab84.jpg",
    icon: Phone
  }
];

export default AboutOrganization;