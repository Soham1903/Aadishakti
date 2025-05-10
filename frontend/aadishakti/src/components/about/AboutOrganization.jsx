import React from 'react';
import { motion } from 'framer-motion';
import { Target, BookOpen } from 'lucide-react';
import SectionTitle from './SectionTitle';

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
              <h3 className="text-2xl font-bold text-gray-800 mb-6">संस्थेचा इतिहास</h3>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  <span className="bg-[#87161a]/10 text-[#87161a] text-sm rounded-full px-3 py-1 font-medium mr-2">2011</span>
                  आदिशक्ती गुरुकुल ज्योतिष संशोधन केंद्र, सासवड, जि. पुणे. ची स्थापना 2011 मध्ये केली.
                </p>
                
                <p>आदिशक्ती गुरुकुलचे पूर्वीचे नाव आदिशक्ती वास्तु ज्योतिष आणि ऊर्जा हीलिंग सेंटर असे होते. परंतु आदिशक्ती गुरुकुलच्या माध्यमातून मोठ्या प्रमाणावर समाजाला कार्यशाळेमार्फत मार्गदर्शन करण्याचे काम करत असल्यामुळे आमच्या संस्थेचे नाव 2019 मध्ये आदिशक्ती गुरुकुल ज्योतिष संशोधन केंद्र, सासवड, जि. पुणे. असे बदलण्यात आले.</p>
                
                <p>2011 पासून वास्तु, ज्योतिष, रेकी, हीलिंग, अंकशास्त्र या सर्व शास्त्रांच्या माध्यमातून सल्ला व मार्गदर्शनाचे काम चालू होते परंतु त्याच बरोबर ठीक ठिकाणी जाऊन अनेक मोफत वास्तू व्हिजिट केल्या व आम्ही शिकवत असलेल्या शास्त्राचा प्रसार आणि प्रचार केला.</p>
                
                <p>त्यानंतर पुणे, नाशिक, कोल्हापूर, सातारा, अहिल्यानगर यासारख्या शहरातील हॉटेलमध्ये कार्यशाळा घेतल्या. त्यातून अनेक व्यक्तींना मार्गदर्शन केले व त्या मार्फत अनेकांनी स्वतःचे व्यवसाय सुरु केले.</p>
                
                <p>वास्तुशास्त्र, रेकी, सम्मोहन, मॅजिक मनी मंत्रा, मनी रेकी, मॅजिकल कॅश बॉक्स, ज्योतिष शास्त्र आणि अंकशास्त्र या विषयावरील कार्यशाळा खूप गाजल्या. व त्यानंतर २०२० पासून ऑनलाईन कार्यशाळाची मागणी वाढली. खरंतर त्यामुळे अनेक व्यक्तींना शिकवण्याचे भाग्य आम्हाला मिळाले.</p>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Mission & Vision */}
          <motion.div
            variants={fadeInUp}
            className="space-y-8"
          >
            {/* Mission Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#87161a] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#87161a]/5 rounded-full -mr-20 -mt-20"></div>
              
              <div className="relative">
                <div className="flex items-start mb-6">
                  <Target className="w-8 h-8 text-[#87161a] mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">उद्देश</h3>
                </div>
                
                <p className="text-gray-700 ml-12">
                  आमचे विविध विषय वैज्ञानिक पद्धतीने शिकवणे व जास्तीत जास्त व्यक्तींपर्यंत त्यांचे फायदे पोहोचवणे तसेच गरजू व्यक्तींच्या समस्या निर्मूलन करणे.
                </p>
              </div>
            </div>
            
            {/* Vision Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#87161a] overflow-hidden relative">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#87161a]/5 rounded-full -mr-20 -mb-20"></div>
              
              <div className="relative">
                <div className="flex items-start mb-6">
                  <BookOpen className="w-8 h-8 text-[#87161a] mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">उद्दिष्ट</h3>
                </div>
                
                <p className="text-gray-700 ml-12">
                  विविध कार्यशाळांच्या माध्यमातून समाजापर्यंत वैज्ञानिक दृष्टिकोनातून सोप्या भाषेमध्ये आम्ही शिकवत असलेल्या सर्व शास्त्रांचा प्रचार आणि प्रसार करणे तसेच ही सर्व शास्त्र म्हणजे अंधश्रद्धा नाही तर विज्ञान आहे ही संकल्पना राबवणे.
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
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#87161a]/90 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <service.icon className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Services data
const services = [
  {
    title: "वास्तुशास्त्र",
    description: "वैज्ञानिक पद्धतीचे वास्तुशास्त्र मार्गदर्शन व कार्यशाळा",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: "ज्योतिष",
    description: "वैज्ञानिक दृष्टिकोनातून ज्योतिष शास्त्राचे मार्गदर्शन",
    image: "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    title: "रेकी हीलिंग",
    description: "प्राचीन उर्जा उपचार पद्धती व प्रशिक्षण",
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: "संमोहन",
    description: "स्वसंमोहन, क्लिनिकल हिप्नोसिस आणि मॅजिकल हिप्नोसिस",
    image: "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "अंकशास्त्र",
    description: "अंकशास्त्र आणि मोबाईल न्यूमरॉलॉजी",
    image: "https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    )
  },
  {
    title: "विश्वाकर्षण",
    description: "लॉ ऑफ अट्रॅक्शन व मॅजिक मनी मंत्रा",
    image: "https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  }
];


export default AboutOrganization;