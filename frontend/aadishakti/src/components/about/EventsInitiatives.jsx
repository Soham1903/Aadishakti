import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, BookOpen, Music, Youtube, Trophy, Award, Star, Gem } from 'lucide-react';
import SectionTitle from './SectionTitle';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EventsInitiatives = () => {
  return (
    <div className="space-y-16">
      {/* Events Section */}
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
          title="अधिवेशन"
          subtitle="आदिशक्ती गुरुकुलचे प्रमुख अधिवेशने"
        />
        
        <motion.div 
          variants={fadeIn}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {events.map((event, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-xl group ${
                index % 2 === 0 ? 'bg-[#87161a]' : 'bg-white'
              }`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="p-8 relative z-10">
                <div className={`text-4xl font-bold mb-4 ${
                  index % 2 === 0 ? 'text-white' : 'text-[#87161a]'
                }`}>
                  {event.date}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${
                  index % 2 === 0 ? 'text-white' : 'text-gray-800'
                }`}>
                  {event.title}
                </h3>
                
                <p className={`mb-4 ${
                  index % 2 === 0 ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {event.description}
                </p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  index % 2 === 0 
                    ? 'bg-white text-[#87161a]' 
                    : 'bg-[#87161a]/10 text-[#87161a]'
                }`}>
                  <Calendar className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
              </div>
              
              {/* Decorative element */}
              <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full transition-opacity duration-300 ${
                index % 2 === 0 ? 'bg-white/10' : 'bg-[#87161a]/10'
              }`}></div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Social Initiatives */}
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
          title="सामाजिक उपक्रम"
          subtitle="आदिशक्ती गुरुकुलचे अध्यात्मिक व सामाजिक उपक्रम"
        />
        
        <motion.div variants={fadeIn} className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-64 relative">
                <img 
                  src="https://images.pexels.com/photos/7640033/pexels-photo-7640033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Spiritual Workshop" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">अध्यात्मिक उपक्रम</h3>
                    <p className="text-white/80">2019 पासून अनेक वर्ष महिलांसाठी विविध मोफत अध्यात्मिक आणि सामाजिक उपक्रम.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {initiatives.map((initiative, index) => (
                    <div key={index} className="flex">
                      <initiative.icon className="w-8 h-8 text-[#87161a] shrink-0 mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">{initiative.title}</h4>
                        <p className="text-gray-600 text-sm">{initiative.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Team card with scrollable list */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-[#87161a] flex items-center">
                  <Users className="w-5 h-5 text-[#d4af37] mr-2" />
                  आध्यात्मिक उपक्रम समिती
                </h3>
              </div>
              
              <div className="p-6">
                <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  <ul className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#87161a]/10 flex items-center justify-center text-[#87161a] mr-4">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* YouTube Channel */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="bg-gradient-to-r from-[#87161a]/10 to-[#87161a]/5 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <Youtube className="w-16 h-16 text-[#87161a] mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">आदिशक्ती गुरुकुल यूट्यूब चॅनेल</h3>
              <p className="text-gray-700 mb-6">
                अनेक अध्यात्मिक मार्गदर्शनपर व्हिडिओ, वास्तु, ज्योतिष, रेकी, अंकशास्त्र या विषयांवरील मोफत मार्गदर्शन व कार्यशाळा आमच्या यूट्यूब चॅनेलवर उपलब्ध आहेत.
              </p>
              <a 
                href="https://www.youtube.com/channel/UCxxxxxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 bg-[#87161a] text-white rounded-full hover:bg-[#87161a]/90 transition-colors"
              >
                <Youtube className="w-5 h-5 mr-2" />
                चॅनेलला भेट द्या
              </a>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {youtubeVideos.map((video, index) => (
                <a 
                  key={index}
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative rounded-lg overflow-hidden aspect-video group"
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <Youtube className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Awards Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mt-16"
      >
        <SectionTitle 
          title="विविध पुरस्कारांचे वितरण"
          subtitle="आदिशक्ती गुरुकुलचे प्रतिष्ठित पुरस्कार"
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Award Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#87161a]/20 hover:shadow-xl transition-shadow">
            <div className="bg-[#87161a] p-4 flex justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">उत्तम लेखक पुरस्कार</h3>
              <p className="text-gray-600 mb-4">अष्टक वर्ग महागुरु</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#87161a]/10 flex items-center justify-center text-[#87161a] mr-3">
                  <span className="font-medium">प्</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">श्री. प्रदीप पंडित</h4>
                </div>
              </div>
            </div>
          </div>
          
          {/* Award Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#87161a]/20 hover:shadow-xl transition-shadow">
            <div className="bg-[#87161a] p-4 flex justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">ज्योतिष भूषण पुरस्कार</h3>
              <p className="text-gray-600 mb-4">ज्योतिषाचार्य</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#87161a]/10 flex items-center justify-center text-[#87161a] mr-3">
                  <span className="font-medium">दी</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">श्री. दीनानाथ जोशी</h4>
                </div>
              </div>
            </div>
          </div>
          
          {/* Award Card 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#87161a]/20 hover:shadow-xl transition-shadow">
            <div className="bg-[#87161a] p-4 flex justify-center">
              <Star className="w-10 h-10 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">कार्यगौरव पुरस्कार</h3>
              <p className="text-gray-600 mb-4">सक्रिय सहभाग</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#87161a]/10 flex items-center justify-center text-[#87161a] mr-3">
                  <span className="font-medium">वी</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">सौ. वीणा जोशी</h4>
                </div>
              </div>
            </div>
          </div>
          
          {/* Award Card 4 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#87161a]/20 hover:shadow-xl transition-shadow">
            <div className="bg-[#87161a] p-4 flex justify-center">
              <Gem className="w-10 h-10 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">सेवा गौरव पुरस्कार</h3>
              <p className="text-gray-600 mb-4">समर्पित सेवा</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#87161a]/10 flex items-center justify-center text-[#87161a] mr-2">
                    <span className="font-medium text-sm">व</span>
                  </div>
                  <h4 className="font-medium text-gray-800 text-sm">सौ. वर्षा सिध्दे</h4>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#87161a]/10 flex items-center justify-center text-[#87161a] mr-2">
                    <span className="font-medium text-sm">न</span>
                  </div>
                  <h4 className="font-medium text-gray-800 text-sm">सौ. नयना बेलवलकर</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Special Recognition Card */}
        <div className="mt-8 bg-gradient-to-r from-[#87161a]/5 to-[#87161a]/10 rounded-xl p-6 md:p-8 border border-[#87161a]/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
              <div className="w-20 h-20 rounded-full bg-[#87161a] flex items-center justify-center text-white">
                <Trophy className="w-10 h-10" />
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2">जीवनगौरव पुरस्कार</h3>
              <p className="text-gray-700 mb-4">
                सामाजिक कार्यकर्त्या आणि आदिशक्ती गुरुकुलच्या सल्लागार
              </p>
              <div className="flex justify-center md:justify-start">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#87161a]/10 flex items-center justify-center text-[#87161a] mr-2">
                    <span className="font-medium">सु</span>
                  </div>
                  <h4 className="font-medium text-gray-800">सौ. सुधा सुळे</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Data
const events = [
  {
    date: "5 मे 2024",
    title: "राज्यस्तरीय वास्तु, ज्योतिष आणि मनशक्ती अधिवेशन",
    description: "आचार्य अत्रे प्रतिष्ठान सासवड, जिल्हा पुणे येथे भव्य दिव्य राज्यस्तरीय अधिवेशन",
    location: "सासवड, पुणे"
  },
  {
    date: "7 डिसें 2024",
    title: "राज्यस्तरीय वास्तू अधिवेशन",
    description: "डोंबिवली येथे वास्तुशास्त्राच्या वैज्ञानिक अंगावर आधारित राज्यस्तरीय अधिवेशन",
    location: "डोंबिवली"
  },
  {
    date: "8 मार्च 2024",
    title: "महिला दिन आणि आनंद मेळा",
    description: "महिला दिनानिमित्त महिलांसाठी अध्यात्मिक मार्गदर्शन व उपक्रम",
    location: "पुणे"
  },
  {
    date: "नियमित",
    title: "ऑनलाईन मोफत कार्यशाळा",
    description: "अनेक विषयांवर ऑनलाईन स्वरूपात नियमित आयोजित मोफत कार्यशाळा",
    location: "ऑनलाईन"
  }
];

const initiatives = [
  {
    title: "श्री सूक्त आवर्तन",
    description: "प्रत्येक पोर्णिमा आणि चतुर्थी या दिवशी ऑनलाइन पद्धतीने श्री सूक्त आवर्तन आणि अथर्वशीर्ष आवर्तनं",
    icon: BookOpen
  },
  {
    title: "भजन प्रशिक्षण",
    description: "महिलांसाठी मोफत ऑनलाईन भजन प्रशिक्षण आणि सुगम संगीत प्रशिक्षण आणि स्पर्धा",
    icon: Music
  },
  {
    title: "सामूहिक सप्तशती वाचन",
    description: "प्रत्येक नवरात्रात सामूहिक सप्तशती वाचन सेवा व मोफत सप्तशती वाचन प्रशिक्षण",
    icon: BookOpen
  },
  {
    title: "यूट्यूब व्हिडिओ",
    description: "अनेक विषयांवर वैज्ञानिक दृष्टिकोनातून मार्गदर्शनपर व्हिडिओ",
    icon: Youtube
  }
];

const teamMembers = [
  { name: "सौ. चारुशीला कांबळे", role: "संस्थापक अध्यक्ष" },
  { name: "श्री. श्रीकांत कांबळे", role: "खजिनदार" },
  { name: "सौ. वीणा जोशी", role: "कार्याध्यक्ष" },
  { name: "सौ. वर्षा सिध्दे", role: "सहकार्याध्यक्ष आणि सुगम संगीत विभाग प्रमुख" },
  { name: "श्री. दीनानाथ जोशी", role: "मार्गदर्शक" },
  { name: "सौ. सुधा सुळे", role: "मार्गदर्शक" },
  { name: "श्रीमती नयनाताई बेलवलकर", role: "भजन विभाग प्रमुख" },
  { name: "सौ. ज्योती िानवे", role: "योगा विभाग प्रमुख" },
  { name: "श्री. कमलाकर कहाने", role: "सदस्य" },
  { name: "सौ. चंद्रकला कहाने", role: "सदस्य" },
  { name: "सौ. रोदहणी लभडे", role: "सदस्य" },
  { name: "श्री सुधीर लभडे", role: "सदस्य" },
  { name: "सौ. पद्मिा कुलकणी", role: "सदस्य" }
];

const youtubeVideos = [
  {
    title: "वास्तुशास्त्र मार्गदर्शन",
    thumbnail: "https://img.youtube.com/vi/ij-9A1lKUGQ/maxresdefault.jpg",
    url: "https://youtu.be/ij-9A1lKUGQ?si=vzIniqNttb9inZUY"
  },
  {
    title: "रेकी हीलिंग",
    thumbnail: "https://img.youtube.com/vi/aN4drft6JJE/maxresdefault.jpg",
    url: "https://youtu.be/aN4drft6JJE?si=6Eoi2JXLN8PPiBZ-" 
  },
  {
    title: "ज्योतिष मार्गदर्शन",
    thumbnail: "https://img.youtube.com/vi/xCRhaSaKvV4/maxresdefault.jpg",
    url: "https://youtu.be/xCRhaSaKvV4?si=ORpbv_jflpm1Xzy2"
  },
  {
    title: "अंकशास्त्र",
    thumbnail: "https://img.youtube.com/vi/gbuJD-Vlidg/maxresdefault.jpg",
    url: "https://youtu.be/gbuJD-Vlidg?si=f40u1JAs-5lcdGr5"
  }
];

export default EventsInitiatives;