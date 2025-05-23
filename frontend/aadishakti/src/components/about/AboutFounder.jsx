import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { FadeInSection } from "./FadeInSection";

const AboutFounder = () => {
  return (
    <div className="space-y-16">
      {/* Profile Section */}
      <FadeInSection>
        <SectionHeading title="संस्थापक अध्यक्षा परिचय" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Profile Image */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#87161a]/10 to-[#87161a]/30 rounded-xl blur"></div>
              <div className="relative overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
                <img
                  src="/assets/charushila1.png"
                  alt="सौ. चारुशीला कांबळे"
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100 h-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                  ज्योतिषाचार्य सौ. चारुशीला श्रीकांत कांबळे (शिंपी)
                </h3>
                <p className="text-[#87161a]/80 text-lg mb-4">
                  संस्थापक अध्यक्षा, आदिशक्ति गुरुकुल ज्योतिष संशोधन केंद्र सासवड,
                  जि. पुणे <br />
                  एम. कॉम., वास्तु, ज्योतिष, रेकी, हिलींग आणि संमोहन तज्ञ,
                  अंकशास्त्र व मोबाईल न्यूमरॉलॉजी तज्ञ
                </p>

                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    वास्तु, ज्योतिष, रेकी, हीलींग, टॅरॉकार्ड रिडर, रमल शास्त्री,
                    मोबाईल न्यूमरॉलॉजी, डाउझिंग आणि या सारख्या अनेक विषयांचा
                    अभ्यास २००० पासून आवड म्हणून सुरू केला. वरील सर्व प्रत्येक
                    शास्त्र विज्ञानावर आधारित आहे ते कसे हे सर्वांना समजावे म्हणून
                    २०१० पासून या क्षेत्रात पदार्पण केले. या विषयांच्या कार्यशाळा
                    आणि मार्गदर्शन सलग २०११ पासून करत आहे.
                  </p>

                  <p>
                    अनेक विषयांच्या मोफत कार्यशाळा चालू असतात त्यामुळे हे ज्ञान
                    अनेकांपर्यंत पोहोचवण्याचे कार्य हाती घेतले आहे. तसेच अनेक
                    लोकांना समस्यामुक्त करण्यासाठी मार्गदर्शन करणे व अंधश्रद्धेचा
                    वापर न करता वैज्ञानिक दृष्टिकोनातून रेकी, हीलिंग, संमोहन,
                    यासारख्या विषयांमधून समस्या निराकारण करणे. आदिशक्ती गुरुकुल हे
                    यूट्यूब चैनल सध्या कार्यान्वित आहे. विविध अधिवेशनांमध्ये
                    वास्तु ज्योतिष आणि मोबाईल न्यूमरॉलॉजी या विषयांवर व्याख्याने
                    दिली जातात.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Awards & Recognition */}
      <FadeInSection>
        <SectionHeading
          title="पुरस्कार आणि सन्मान"
          subtitle="विविध मान्यवर संस्थांकडून प्राप्त पुरस्कार"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Honorary Titles - Left column */}
          <div className="lg:col-span-4">
            <AwardsCard 
              title="मानद पदव्या" 
              icon={<Award className="h-5 w-5 text-[#87161a]" />}
              items={honoraryTitles.map(title => ({
                organization: title.organization,
                title: title.title
              }))}
            />
          </div>

          {/* Speaker Recognition - Right column */}
          <div className="lg:col-span-8">
            <AwardsCard
              title="वक्ते म्हणून स्मृतीचिन्ह आणि सत्कार"
              icon={<Award className="h-5 w-5 text-[#87161a]" />}
              items={speakerRecognitions.map(recognition => ({
                title: recognition
              }))}
            />
          </div>

          {/* Awards - Full Width Section */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
              <h3 className="text-xl font-medium text-slate-800 mb-6 flex items-center">
                <Award className="h-5 w-5 text-[#87161a] mr-2" />
                प्रमुख पुरस्कार
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm hover:shadow transition-shadow"
                  >
                    <h4 className="font-medium text-slate-800 mb-2 text-lg">
                      {award.title}
                    </h4>
                    <p className="text-slate-500 text-sm">
                      {award.organization}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Publications Section */}
      <FadeInSection>
        <SectionHeading title="लेखन" subtitle="प्रकाशित साहित्य" />

        <div className="mt-8 bg-white rounded-xl shadow-sm p-8 border border-slate-100">
          {/* Published Books */}
          <div className="mb-10">
            <h3 className="text-xl font-medium text-slate-800 mb-6 flex items-center">
              <BookOpen className="h-5 w-5 text-[#87161a] mr-2" />
              प्रकाशित पुस्तके
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start bg-slate-50/50 p-4 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="bg-white p-2 rounded-lg mr-3 shadow-sm">
                    <book.icon className="h-6 w-6 text-[#87161a]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">
                      {book.title}
                    </h4>
                    {book.publisher && (
                      <p className="text-sm text-slate-500 mt-1">
                        {book.publisher}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Publications */}
          <div>
            <h3 className="text-xl font-medium text-slate-800 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 text-[#87161a] mr-2" />
              आगामी प्रकाशने
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                "संमोहन",
                "मॅजिक मनी मंत्रा",
                "ज्योतिष शास्त्रानुसार वैवाहिक जीवन",
              ].map((title, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-50 py-2 px-4 rounded-full text-slate-700 text-sm border border-slate-200"
                >
                  {title}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

const AwardsCard = ({ title, icon, items }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100 h-full">
      <h3 className="text-xl font-medium text-slate-800 mb-6 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-3 border-l-2 border-[#87161a]/20 hover:border-[#87161a] pl-4 transition-colors"
          >
            {item.organization && (
              <p className="text-slate-500 text-sm">
                {item.organization} यांच्यातर्फे
              </p>
            )}
            <p className="font-medium text-slate-700 mt-1">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Book data
const books = [
  {
    title: "काव्यसंग्रह चारू मनीष",
    publisher: "चंद्रवल्लभ प्रकाशन, पुणे",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "वास्तुशास्त्र फक्त विज्ञानच",
    publisher: "चंद्रवल्लभ प्रकाशन, पुणे",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: "अशक्य ते शक्य करतील स्वामी",
    publisher: "चंद्रवल्लभ प्रकाशन, पुणे",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "यशस्वी भव",
    publisher: "प्रगती प्रकाशन, पुणे",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "महिला उद्योजिका, एक राष्ट्रनिर्माती",
    publisher: "सकाळ प्रकाशन, पुणे",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "रेकी लेवल १, २, ३",
    publisher: "आदिशक्ती पब्लिकेशन सासवड",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: "अंकशास्त्र आणि मोबाईल न्यूमरोलॉजी",
    publisher: "आदिशक्ती पब्लिकेशन सासवड",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "विश्वाकर्षण लॉ ऑफ अट्रॅक्शन",
    publisher: "आदिशक्ती पब्लिकेशन सासवड",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
  },
  {
    title: "ज्येष्ठ नागररकांसाठी उद्योग",
    publisher: " व्यवसाय प्रशिक्षण पुणे स्टडी मटेरियल",
    icon: (props) => (
      <svg
        {...props}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

// Honorary Titles data
const honoraryTitles = [
  {
    organization: "ओम सिंडिकेट, नाशिक",
    title: "ज्योतिषाचार्य पुरस्कार",
  },
  {
    organization: "योगीराज वास्तू ज्योतिष अनुसंधान, छ. संभाजीनगर",
    title: "वास्तु ज्योतिष महागुरु",
  },
  {
    organization: "श्री ज्योतीष संशोधन केंद्र, जळगाव",
    title: "वास्तु न्यूमरो महागुरू",
  },
];

// Speaker recognitions data
const speakerRecognitions = [
  "श्री आदिनाथ साळवी यांच्या विधीलिखित या संस्थेतर्फे त्रिदशकोत्तर या सोहळ्या निमित्ताने",
  "श्री स्वामी समर्थ गणेश चॅरिटेबल ट्रस्ट, सातारा आणि मराठी ज्योतिष मंडळ महाराष्ट्र राज्य अधिवेशना निमित्ताने",
  "भालचंद्र जोर्तिविद्यालय आणि रमणलाल शहा ज्योतिष अकॅडमी अधिवेशना निमित्ताने",
  "स्वप्नल फाउंडेशन यांच्यातर्फे महिला दिनानिमित्त राज्यस्तरीय पुरस्कार",
  "यश एज्युकेशन सोसायटी यांच्यातर्फे यशस्वी उद्योजिका पुरस्कार",
  "भारतीय कृषक समाज नवी दिल्ली क्रांतीज्योती महिला पुरस्कार",
];

// Awards data
const awards = [
  {
    title: "यशस्वी उद्योजिका पुरस्कार",
    organization: "यश एज्युकेशन सोसायटी",
  },
  {
    title: "राज्यस्तरीय पुरस्कार",
    organization: "स्वप्नल फाउंडेशन",
  },
  {
    title: "क्रांतीज्योती महिला पुरस्कार",
    organization: "भारतीय कृषक समाज, नवी दिल्ली",
  },
];

export default AboutFounder;