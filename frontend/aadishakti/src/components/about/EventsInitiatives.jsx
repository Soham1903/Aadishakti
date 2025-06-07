import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Youtube, Trophy, Award, User } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { FadeInSection } from "./FadeInSection";

const EventsInitiatives = () => {
  return (
    <div className="space-y-16">
      {/* Events Section */}
      <FadeInSection>
        <SectionHeading
          title="अधिवेशन"
          subtitle="आदिशक्ती गुरुकुलची प्रमुख अधिवेशने"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
      </FadeInSection>

      {/* Social Initiatives */}
      <FadeInSection>
        <SectionHeading
          title="सामाजिक उपक्रम"
          subtitle="आदिशक्ती गुरुकुलचे अध्यात्मिक व सामाजिक उपक्रम"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main initiatives card */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
              <div className="h-64 relative">
                <img
                  src="https://images.pexels.com/photos/7640033/pexels-photo-7640033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Spiritual Workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-medium mb-2">
                      अध्यात्मिक उपक्रम
                    </h3>
                    <p className="text-white/90">
                      2019 पासून अनेक वर्ष महिलांसाठी विविध मोफत अध्यात्मिक आणि
                      सामाजिक उपक्रम.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {initiatives.map((initiative, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <initiative.icon className="w-6 h-6 text-[#87161a]/80 shrink-0 mr-4 mt-1" />
                      <div>
                        <h4 className="font-medium text-slate-800 mb-2">
                          {initiative.title}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {initiative.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Team card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 h-full">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-xl font-medium text-slate-800 flex items-center">
                  <Users className="w-5 h-5 text-[#87161a]/80 mr-2" />
                  आध्यात्मिक उपक्रम समिती
                </h3>
              </div>

              <div className="p-4 max-h-[400px] overflow-y-auto">
                <ul className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start p-2 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#87161a]/80 mr-3 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 text-sm">
                          {member.name}
                        </h4>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* YouTube Channel */}
      <FadeInSection>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <Youtube className="w-12 h-12 text-[#87161a]/80 mb-6" />
              <h3 className="text-2xl font-medium text-slate-800 mb-4">
                आदिशक्ती गुरुकुल यूट्यूब चॅनेल
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                अनेक विषयांवरील मार्गदर्शन पर व्हिडिओ तसेच ज्योतिष अंकशास्त्र
                रेकी हीलिंग अंकशास्त्र, टॅरो कार्ड , मोबाईल न्यूमरॉलॉजी ,
                अध्यात्म , विज्ञान , यासारख्या विषयांवरील मोफत मार्गदर्शन पर
                कार्यशाळा आमच्या यूट्यूब चैनल वर उपलब्ध आहेत
              </p>
              <a
                href="https://www.youtube.com/channel/UCxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-[#87161a]/80 text-white rounded-full hover:bg-[#87161a] transition-colors text-sm"
              >
                <Youtube className="w-4 h-4 mr-2" />
                चॅनेलला भेट द्या
              </a>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {youtubeVideos.map((video, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-lg overflow-hidden aspect-video group shadow-sm"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/60 flex items-center justify-center transition-colors">
                    <Youtube className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Awards Section */}
      <FadeInSection>
        <SectionHeading
          title="विविध पुरस्कारांचे वितरण"
          subtitle="आदिशक्ती गुरुकुलचे प्रतिष्ठित पुरस्कार"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {awardRecipients.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </div>
      </FadeInSection>
    </div>
  );
};

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 hover:shadow transition-shadow"
    >
      <div className="p-6">
        <h3 className="text-xl font-medium text-slate-800 mb-3">
          {event.title}
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          {event.description}
        </p>
        <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-slate-100 text-slate-700">
          <Calendar className="w-4 h-4 mr-1.5" />
          {event.location}
        </div>
      </div>
    </motion.div>
  );
};

const AwardCard = ({ award, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 hover:shadow transition-shadow"
    >
      <div className="p-4 bg-slate-50 flex justify-center">
        <award.icon className="w-8 h-8 text-[#87161a]/80" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-medium text-slate-800 mb-2">
          {award.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4">{award.subtitle}</p>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#87161a]/80 mr-3">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-slate-700 text-sm">
              {award.recipient}
            </h4>
            {award.role && (
              <p className="text-xs text-slate-500">{award.role}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Data
const events = [
  {
    title: "राज्यस्तरीय वास्तु, ज्योतिष आणि मनशक्ती अधिवेशन",
    description:
      "आचार्य अत्रे प्रतिष्ठान सासवड, जिल्हा पुणे येथे भव्य दिव्य राज्यस्तरीय अधिवेशन",
    location: "सासवड, पुणे",
  },
  {
    title: "राज्यस्तरीय वास्तू अधिवेशन",
    description:
      "डोंबिवली येथे वास्तुशास्त्र या विषयावर आधारित विविध व्याख्याने आयोजित केली अनेक मान्यवर यावेळी उपस्थित होते .",
    location: "डोंबिवली",
  },
  {
    title: "महिला दिन आणि आनंद मेळा",
    description:
      "दरवर्षी प्रमाणे महिला दिनानिमित्त महिलांसाठी होम मिनिस्टर आणि सुगम संगीत कार्यक्रमाचे आयोजन आणि विविध पुरस्कार आणि बक्षिसांचे वाटप करण्यात आले . ",
    location: "पुणे",
  },
  {
    title: "ऑनलाईन मोफत कार्यशाळा",
    description: "अनेक विषयांवर ऑनलाईन स्वरूपात नियमित मोफत कार्यशाळा",
    location: "ऑनलाईन",
  },
];

const initiatives = [
  {
    title: "श्री सूक्त आवर्तन",
    description:
      "प्रत्येक पोर्णिमा आणि चतुर्थी या दिवशी ऑनलाइन पद्धतीने श्री सूक्त आवर्तन आणि अथर्वशीर्ष आवर्तनं",
    icon: Calendar,
  },
  {
    title: "सुगम संगीत आणि भजन प्रशिक्षण ",
    description:
      "महिलांसाठी मोफत ऑनलाईन भजन प्रशिक्षण आणि सुगम संगीत प्रशिक्षण आणि स्पर्धा",
    icon: Users,
  },
  {
    title: "सामूहिक सप्तशती वाचन",
    description:
      "प्रत्येक नवरात्रात सामूहिक सप्तशती वाचन सेवा व मोफत सप्तशती वाचन प्रशिक्षण",
    icon: Calendar,
  },
  {
    title: "यूट्यूब व्हिडिओ",
    description: "अनेक विषयांवर वैज्ञानिक दृष्टिकोनातून मार्गदर्शनपर व्हिडिओ",
    icon: Youtube,
  },
];

const teamMembers = [
  { name: "सौ. चारुशीला कांबळे", role: "संस्थापक अध्यक्ष" },
  { name: "श्री. श्रीकांत कांबळे", role: "खजिनदार" },
  { name: "सौ. वीणा जोशी", role: "कार्याध्यक्ष" },
  { name: "सौ. वर्षा सिध्दे", role: "सहकार्याध्यक्ष" },
  { name: "श्री. दीनानाथ जोशी", role: "मार्गदर्शक" },
  { name: "सौ. सुधा सुळे", role: "मार्गदर्शक" },
  { name: "श्रीमती नयनाताई बेलवलकर", role: "भजन विभाग प्रमुख" },
  { name: "सौ. ज्योती दानवे", role: "योगा विभाग प्रमुख" },
  { name: "श्री. कमलाकर कहाने", role: "सदस्य" },
  { name: "सौ. चंद्रकला कहाने", role: "सदस्य" },
  { name: "सौ. रोहिणी भिडे", role: "सदस्य" },
  { name: "श्री. सुधीर भिडे", role: "सदस्य" },
  { name: "सौ. पद्मजा कुलकर्णी", role: "सदस्य" },
];

const youtubeVideos = [
  {
    title: "वास्तुशास्त्र मार्गदर्शन",
    thumbnail: "https://img.youtube.com/vi/ij-9A1lKUGQ/maxresdefault.jpg",
    url: "https://youtu.be/ij-9A1lKUGQ?si=vzIniqNttb9inZUY",
  },
  {
    title: "रेकी हीलिंग",
    thumbnail: "https://img.youtube.com/vi/aN4drft6JJE/maxresdefault.jpg",
    url: "https://youtu.be/aN4drft6JJE?si=6Eoi2JXLN8PPiBZ-",
  },
  {
    title: "ज्योतिष मार्गदर्शन",
    thumbnail: "https://img.youtube.com/vi/xCRhaSaKvV4/maxresdefault.jpg",
    url: "https://youtu.be/xCRhaSaKvV4?si=ORpbv_jflpm1Xzy2",
  },
  {
    title: "अंकशास्त्र",
    thumbnail: "https://img.youtube.com/vi/gbuJD-Vlidg/maxresdefault.jpg",
    url: "https://youtu.be/gbuJD-Vlidg?si=f40u1JAs-5lcdGr5",
  },
];

const awardRecipients = [
  {
    title: "उत्तम लेखक पुरस्कार",
    subtitle: "अष्टक वर्ग महागुरु",
    recipient: "श्री. प्रदीप पंडित",
    icon: Trophy,
  },
  {
    title: "ज्योतिष भूषण पुरस्कार",
    subtitle: "ज्योतिषाचार्य",
    recipient: "श्री. दीनानाथ जोशी",
    icon: Award,
  },
  {
    title: "कार्यगौरव पुरस्कार",
    subtitle: "सक्रिय सहभाग",
    recipient: "सौ. वीणा जोशी",
    icon: Trophy,
  },
  {
    title: "सेवा गौरव पुरस्कार",
    subtitle: "समर्पित सेवा",
    recipient: "सौ. वर्षा सिध्दे",
    icon: Award,
  },
  {
    title: "जीवनगौरव पुरस्कार",
    subtitle: "सामाजिक कार्यकर्त्या",
    recipient: "सौ. सुधा सुळे",
    role: "आदिशक्ती गुरुकुलच्या सल्लागार",
    icon: Trophy,
  },
];

export default EventsInitiatives;
