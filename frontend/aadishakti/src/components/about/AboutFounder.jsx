import { motion } from 'framer-motion';
import { BookOpen, Award } from 'lucide-react';
import SectionTitle from './SectionTitle';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutFounder = () => {
  return (
    <div className="space-y-16">
      {/* Profile Section */}
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
        className="mb-16"
      >
        <SectionTitle 
          title="संस्थापक अध्यक्षा परिचय"
        />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Profile Image */}
          <motion.div
            variants={fadeIn}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="relative top-6">
  {/* Gradient background - adjust top position to match new image position */}
  <div className="w-64 h-80 bg-gradient-to-br from-[#87161a] to-[#87161a]/70 rounded-2xl absolute top-0 left-0"></div>
  {/* Image with adjusted margin-top */}
  <img
    src="/assets/charushila1.png"
    alt="सौ. चारुशीला कांबळे"
    className="w-64 h-80 object-cover rounded-2xl relative z-10 mt-4"  // Added mt-2 here
  />
</div>
          </motion.div>
          
          {/* Right Content */}
          <motion.div variants={fadeIn} className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">ज्योतिषाचार्य सौ. चारुशीला श्रीकांत कांबळे (शिंपी)</h3>
              <p className="text-gray-600 mb-6">संस्थापक अध्यक्षा, आदिशक्ति गुरुकुल ज्योतिष संशोधन केंद्र सासवड, जि. पुणे <br/>एम. कॉम., वास्तु, ज्योतिष, रेकी, हिलींग आणि संमोहन तज्ञ, अंकशास्त्र व मोबाईल न्यूमरॉलॉजी तज्ञ</p>
              {/* <p className="text-gray-600 mb-6">एम. कॉम., वास्तु, ज्योतिष, रेकी, हिलींग आणि संमोहन तज्ञ, अंकशास्त्र व मोबाईल न्यूमरॉलॉजी तज्ञ</p> */}
              
              <div className="space-y-4 text-gray-700">
                <p>वास्तु, ज्योतिष, रेकी, हीलींग, टॅरॉकार्ड रिडर, रमल शास्त्री, मोबाईल न्यूमरॉलॉजी, डाउझिंग आणि या सारख्या अनेक विषयांचा अभ्यास २००० पासून आवड म्हणून सुरू केला. वरील सर्व प्रत्येक शास्त्र विज्ञानावर आधारित आहे ते कसे हे सर्वांना समजावे म्हणून २०१० पासून या क्षेत्रात पदार्पण केले. या विषयांच्या कार्यशाळा आणि मार्गदर्शन सलग २०११ पासून करत आहे.</p>
                
                <p>अनेक विषयांच्या मोफत कार्यशाळा चालू असतात त्यामुळे हे ज्ञान अनेकांपर्यंत पोहोचवण्याचे कार्य हाती घेतले आहे. तसेच अनेक लोकांना समस्यामुक्त करण्यासाठी मार्गदर्शन करणे व अंधश्रद्धेचा वापर न करता वैज्ञानिक दृष्टिकोनातून रेकी, हीलिंग, संमोहन, यासारख्या विषयांमधून समस्या निराकारण करणे. आदिशक्ती गुरुकुल हे यूट्यूब चैनल सध्या कार्यान्वित आहे. विविध अधिवेशनांमध्ये वास्तु ज्योतिष आणि मोबाईल न्यूमरॉलॉजी या विषयांवर व्याख्याने दिली जातात.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Rest of the component remains the same */}
      {/* Awards & Recognition */}
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
      >
        <SectionTitle 
          title="पुरस्कार आणि सन्मान"
          subtitle="विविध मान्यवर संस्थांकडून प्राप्त पुरस्कार"
        />
        
        <motion.div variants={fadeIn} className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#87161a]">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="h-5 w-5 text-[#87161a] mr-2" />
              मानद पदव्या
            </h3>
            
            <ul className="space-y-4 ml-8">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                <span>ओम सिंडिकेट, नाशिक यांच्यातर्फे <span className="font-medium">ज्योतिषाचार्य पुरस्कार</span> ही मानद पदवी</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                <span>योगीराज वास्तू ज्योतिष अनुसंधान, छ. संभाजीनगर या संस्थेकडून - <span className="font-medium">वास्तु ज्योतिष महागुरु</span> ही मानद पदवी</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                <span>श्री ज्योतीष संशोधन केंद्र, जळगाव यांच्याकडून <span className="font-medium">वास्तु न्यूमरो महागुरू</span> ही मानद पदवी</span>
              </li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div variants={fadeIn} className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#87161a]">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="h-5 w-5 text-[#87161a] mr-2" />
              वक्ते म्हणून स्मृतीचिन्ह आणि सत्कार
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-4 ml-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                  <span>श्री आदिनाथ साळवी यांच्या विधीलिखित या संस्थेतर्फे त्रिदशकोत्तर या सोहळ्या निमित्ताने</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                  <span>श्री स्वामी समर्थ गणेश चॅरिटेबल ट्रस्ट, सातारा आणि मराठी ज्योतिष मंडळ महाराष्ट्र राज्य अधिवेशना निमित्ताने</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                  <span>भालचंद्र जोर्तिविद्यालय आणि रमणलाल शहा ज्योतिष अकॅडमी अधिवेशना निमित्ताने</span>
                </li>
              </ul>
              
              <ul className="space-y-4 ml-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                  <span>स्वप्नल फाउंडेशन यांच्यातर्फे महिला दिनानिमित्त राज्यस्तरीय पुरस्कार</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                  <span>यश एज्युकेशन सोसायटी यांच्यातर्फे यशस्वी उद्योजिका पुरस्कार</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-[#87161a] rounded-full mr-3"></span>
                  <span>भारतीय कृषक समाज नवी दिल्ली क्रांतीज्योती महिला पुरस्कार</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Publications - Redesigned Section */}
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
      >
        <SectionTitle 
          title="लेखन"
          subtitle="प्रकाशित साहित्य"
        />
        
        <motion.div variants={fadeIn} className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Published Books - Compact Cards */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 text-[#87161a] mr-2" />
                प्रकाशित पुस्तके
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {books.map((book, index) => (
                  <div 
                    key={index}
                    className="flex items-start p-3 border border-gray-200 rounded-lg hover:border-[#87161a]/40 transition-colors"
                  >
                    <div className="bg-[#87161a]
                     p-2 rounded-lg mr-3">
                      <book.icon className="h-5 w-5 text-[#87161a]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{book.title}</h4>
                      {book.publisher && (
                        <p className="text-xs text-gray-500 mt-1">{book.publisher}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Publications - Compact List */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <BookOpen className="h-5 w-5 text-[#87161a] mr-2" />
                आगामी प्रकाशने
              </h3>
              
              <div className="space-y-2">
                {['संमोहन', 'मॅजिक मनी मंत्रा', 'ज्योतिष शास्त्रानुसार वैवाहिक जीवन'].map((title, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="w-2 h-2 bg-[#87161a] rounded-full mr-3"></span>
                    <span className="text-gray-700">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Book data
const books = [
  {
    title: "काव्यसंग्रह चारू मनीष",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "वास्तुशास्त्र फक्त विज्ञानच",
    publisher: "चंद्रवल्लभ प्रकाशन, पुणे",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: "अशक्य ते शक्य करतील स्वामी",
    publisher: "चद्रवल्लभ प्रकाशन, पुणे",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "यशस्वी भव",
    publisher: "प्रगती प्रकाशन, पुणे",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "महिला उद्योजिका, एक राष्ट्रनिर्माती",
    publisher: "सकाळ प्रकाशन, पुणे",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "रेकी लेवल १, २, ३",
    publisher: "आदिशक्ती पब्लिकेशन सासवड",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: "अंकशास्त्र आणि मोबाईल न्यूमरोलॉजी",
    publisher: "आदिशक्ती पब्लिकेशन सासवड",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "विश्वाकर्षण लॉ ऑफ अट्रॅक्शन",
    publisher: "आदिशक्ती पब्लिकेशन सासवड",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  }
];

export default AboutFounder;