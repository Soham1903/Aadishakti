import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  BookOpen,
  Home,
  Star,
  Zap,
  BookText,
  Calculator,
  Phone,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { FadeInSection } from "./FadeInSection";

const AboutOrganization = () => {
  return (
    <div className="space-y-16">
      <FadeInSection>
        <SectionHeading
          title="आदिशक्ती गुरुकुल"
          subtitle="संस्थेचा परिचय व उद्देश"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Left column - History */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white rounded-xl shadow-sm p-8 border border-slate-100"
          >
            <h3 className="text-2xl font-medium text-slate-800 mb-6 flex items-center">
              <span className="w-1.5 h-8 bg-[#87161a]/80 rounded-full mr-3 inline-block"></span>
              संस्थेचा इतिहास
            </h3>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                आदिशक्ती गुरुकुल ज्योतिष संशोधन केंद्र, सासवड, जि. पुणे. ची
                स्थापना 2011 मध्ये केली.
              </p>

              <p>
                आदिशक्ती गुरुकुलचे पूर्वीचे नाव आदिशक्ती वास्तु ज्योतिष आणि
                ऊर्जा हीलिंग सेंटर असे होते. परंतु आदिशक्ती गुरुकुलच्या
                माध्यमातून मोठ्या प्रमाणावर समाजाला कार्यशाळेमार्फत मार्गदर्शन
                करण्याचे काम करत असल्यामुळे आमच्या संस्थेचे नाव 2011 मध्ये
                आदिशक्ती गुरुकुल ज्योतिष संशोधन केंद्र, सासवड, जि. पुणे. असे
                बदलण्यात आले.
              </p>

              <p>
                2011 पासून वास्तु, ज्योतिष, रेकी, हीलिंग, अंकशास्त्र या सर्व
                शास्त्रांच्या माध्यमातून सल्ला व मार्गदर्शनाचे काम चालू होते
                परंतु त्याच बरोबर ठीक ठिकाणी जाऊन अनेक मोफत वास्तू व्हिजिट
                केल्या व आम्ही शिकवत असलेल्या शास्त्राचा प्रसार आणि प्रचार केला.
              </p>

              <p>
                त्यानंतर पुणे, नाशिक, कोल्हापूर, सातारा, अहिल्यानगर यासारख्या
                शहरातील हॉटेलमध्ये कार्यशाळा घेतल्या. त्यातून अनेक व्यक्तींना
                मार्गदर्शन केले व त्या मार्फत अनेकांनी स्वतःचे व्यवसाय सुरु
                केले.
              </p>

              <p>
                वास्तुशास्त्र, रेकी, सम्मोहन, मॅजिक मनी मंत्रा, मनी रेकी, मॅजिकल
                कॅश बॉक्स, ज्योतिष शास्त्र आणि अंकशास्त्र या विषयावरील कार्यशाळा
                खूप गाजल्या. व त्यानंतर २०२० पासून ऑनलाईन कार्यशाळाची मागणी
                वाढली. खरंतर त्यामुळे अनेक व्यक्तींना शिकवण्याचे भाग्य आम्हाला
                मिळाले.
              </p>
            </div>
          </motion.div>

          {/* Right column - Mission & Vision */}
          <div className="space-y-8">
            {/* Mission Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white rounded-xl shadow-sm p-8 border border-slate-100"
            >
              <h3 className="text-2xl font-medium text-slate-800 mb-6 flex items-center">
                <Target className="w-6 h-6 text-[#87161a]/80 mr-3" />
                उद्देश
              </h3>

              <p className="text-slate-600 leading-relaxed">
                आमचे विविध विषय वैज्ञानिक पद्धतीने शिकवणे व जास्तीत जास्त
                व्यक्तींपर्यंत त्यांचे फायदे पोहोचवणे तसेच गरजू व्यक्तींच्या
                समस्या निर्मूलन करणे.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white rounded-xl shadow-sm p-8 border border-slate-100"
            >
              <h3 className="text-2xl font-medium text-slate-800 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-[#87161a]/80 mr-3" />
                उद्दिष्ट
              </h3>

              <p className="text-slate-600 leading-relaxed">
                विविध कार्यशाळांच्या माध्यमातून समाजापर्यंत वैज्ञानिक
                दृष्टिकोनातून सोप्या भाषेमध्ये आम्ही शिकवत असलेल्या सर्व
                शास्त्रांचा प्रचार आणि प्रसार करणे तसेच ही सर्व शास्त्र म्हणजे
                अंधश्रद्धा नाही तर विज्ञान आहे ही संकल्पना राबवणे.
              </p>
            </motion.div>
          </div>
        </div>
      </FadeInSection>

      {/* Services */}
      <FadeInSection>
        <SectionHeading
          title="आमची सेवा क्षेत्रे"
          subtitle="विविध विषयांच्या कार्यशाळा व मार्गदर्शन"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </FadeInSection>
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow transition-all duration-300 h-full flex flex-col border border-slate-100">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
              <service.icon className="h-5 w-5 text-[#87161a]" />
            </div>
          </div>
        </div>
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-medium text-slate-800 mb-2">
            {service.title}
          </h3>
          <p className="text-slate-600">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Services data with icons
const services = [
  {
    title: "वास्तुशास्त्र",
    description: "वैज्ञानिक पद्धतीचे वास्तुशास्त्र मार्गदर्शन व कार्यशाळा",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: Home,
  },
  {
    title: "ज्योतिष",
    description: "वैज्ञानिक दृष्टिकोनातून ज्योतिष शास्त्राचे मार्गदर्शन",
    image: "assets/AboutOrganization/Jyotish.jpg",
    icon: Star,
  },
  {
    title: "रेकी हीलिंग व उपचार",
    description: "प्राचीन उर्जा उपचार पद्धती व प्रशिक्षण",
    image:
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: Zap,
  },
  {
    title: "संमोहन",
    description: "स्वसंमोहन, क्लिनिकल हिप्नोसिस आणि मॅजिकल हिप्नोसिस",
    image: "assets/AboutOrganization/samohan.jpg",
    icon: BookText,
  },
  {
    title: "अंकशास्त्र आणि नेम न्यूमरॉलॉजी",
    description: "अंकशास्त्र आणि मोबाईल न्यूमरॉलॉजी",
    image: "assets/AboutOrganization/numero.png",
    icon: Calculator,
  },
  {
    title: "मोबाईल न्यूमरॉलॉजी",
    description: "मोबाईल नंबर विश्लेषण आणि त्याचे प्रभाव",
    image: "assets/carousel/स्क्रीन लॉक.jpg",
    icon: Phone,
  },
];

export default AboutOrganization;
