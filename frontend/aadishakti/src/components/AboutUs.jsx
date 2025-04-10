import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Youtube,
  Star,
  Target,
  Sparkles,
  Heart,
  Brain,
  Bot as Lotus,
  Target as Goal,
  BookOpen,
  Award,
} from "lucide-react";

// Services array
const services = [
  {
    category: "Reiki Healing",
    icon: <Sparkles className="w-8 h-8" />,
    description: "Ancient healing technique for energy balance and wellness",
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80",
    items: ["Level 1", "Level 2", "Level 3", "Level 4"],
  },
  {
    category: "Karuna Reiki",
    icon: <Heart className="w-8 h-8" />,
    description: "Advanced healing for deep emotional and spiritual growth",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
    items: ["Basic", "Advanced", "Master Level"],
  },
  {
    category: "Vastu Shastra",
    icon: <Target className="w-8 h-8" />,
    description: "Ancient architectural science for harmony",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    items: [
      "Vastu Shastra Visharad",
      "Vastu Shastra Bhushan",
      "Vastu Shastra Upay Yojana",
    ],
  },
  {
    category: "Hypnotherapy",
    icon: <Brain className="w-8 h-8" />,
    description: "Transform your mind and unlock potential",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
    items: [
      "Swasanmohan (Self-Hypnosis)",
      "Clinical Hypnosis",
      "Magical Hypnosis",
    ],
  },
  {
    category: "Manifestation",
    icon: <Lotus className="w-8 h-8" />,
    description: "Harness the power of intention and energy",
    image:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80",
    items: ["Law of Attraction", "Magic Money Mantra"],
  },
  {
    category: "Advanced Healing",
    icon: <Star className="w-8 h-8" />,
    description: "Specialized healing techniques for transformation",
    image:
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&q=80",
    items: [
      "Pranic Healing",
      "Merkaba Healing",
      "Pitru Dhyana Healing",
      "Power of Trimurti",
      "Dhanadharana Kundalini Yoga",
      "Memory Boosting Reiki",
    ],
  },
];

// Featured videos array
const featuredVideos = [
  {
    title: "Reiki Healing Session",
    thumbnail: "https://img.youtube.com/vi/ij-9A1lKUGQ/maxresdefault.jpg",
    videoUrl: "https://youtu.be/ij-9A1lKUGQ?si=vzIniqNttb9inZUY",
  },
  {
    title: "Spiritual Guidance",
    thumbnail: "https://img.youtube.com/vi/aN4drft6JJE/maxresdefault.jpg",
    videoUrl: "https://youtu.be/aN4drft6JJE?si=6Eoi2JXLN8PPiBZ-",
  },
  {
    title: "Meditation Practice",
    thumbnail: "https://img.youtube.com/vi/xCRhaSaKvV4/maxresdefault.jpg",
    videoUrl: "https://youtu.be/xCRhaSaKvV4?si=ORpbv_jflpm1Xzy2",
  },
  {
    title: "Energy Healing",
    thumbnail: "https://img.youtube.com/vi/gbuJD-Vlidg/maxresdefault.jpg",
    videoUrl: "https://youtu.be/gbuJD-Vlidg?si=f40u1JAs-5lcdGr5",
  },
  {
    title: "Chakra Balancing",
    thumbnail: "https://img.youtube.com/vi/qTYN1OjBSB4/maxresdefault.jpg",
    videoUrl: "https://youtu.be/qTYN1OjBSB4?si=nTsTJMeyuU1SehXj",
  },
  {
    title: "Spiritual Growth",
    thumbnail: "https://img.youtube.com/vi/3UJZXqn3xC4/maxresdefault.jpg",
    videoUrl: "https://youtu.be/3UJZXqn3xC4?si=_TVfKJYkVcRCsQwK",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutUs() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const { ref: introRef, inView: introInView } = useInView({
    triggerOnce: true,
  });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
  });
  const { ref: videosRef, inView: videosInView } = useInView({
    triggerOnce: true,
  });
  const { ref: detailsRef, inView: detailsInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#921a40]/5 via-[#921a40]/10 to-[#921a40]/5">
      {/* Compact Introduction Section */}
      <section className="relative py-16 bg-[#921a40]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              परिचय
            </h1>
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-2xl md:text-3xl mb-4">
                ज्योतिषाचार्य सौ. चारुशीला श्रीकांत कांबळे (शिंपी)
              </h2>
              <p className="text-xl mb-4">
                आदिशक्ति गुरुकुल ज्योतिष संशोधन केंद्र सासवड
              </p>
              <p className="text-lg mb-4">(संस्थापक व अध्यक्ष)</p>
              <p className="text-lg">
                एम. कॉम. वास्तु, ज्योतिष, रेकी, हिलींग आणि संमोहन तज्ञ,
                अंकशास्त्र व मोबाईल न्यूमरॉलॉजी तज्ञ
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Information Section */}
      <section ref={detailsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* कार्यक्षेत्र Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-[#921a40] mr-3" />
                <h3 className="text-2xl font-bold text-[#921a40]">
                  कार्यक्षेत्र
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                वास्तु, ज्योतिष, रेकी, हीलींग, मोबाईल न्यूमरॉलॉजी, डाउझिंग, आणि
                या सारख्या अनेक विषयांच्या कार्यशाळा आणि मार्गदर्शन यामध्ये सलग
                २०१० पासून कार्यरत. वरील सर्व विषयांचा अभ्यास इ.स. २००० पासून
                आवड म्हणून सुरू केला. प्रत्येक शास्त्र विज्ञानावर आधारित आहे ते
                कसे हे सर्वांना समजावे म्हणून २०१० पासून या क्षेत्रात पदार्पण
                केले.
              </p>
            </motion.div>

            {/* उद्देश Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <Goal className="w-8 h-8 text-[#921a40] mr-3" />
                <h3 className="text-2xl font-bold text-[#921a40]">उद्देश</h3>
              </div>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>
                  ज्योतिष शास्त्राचा व इतर सर्व गुढ शास्त्रांचा प्रचार आणि
                  प्रसार
                </li>
                <li>
                  अनेकांना योग्य पद्धतीने शिक्षण देऊन चांगले विद्यार्थी घडवणे
                </li>
                <li>विज्ञान आधारित दृष्टिकोन प्रस्थापित करणे</li>
                <li>मोफत कार्यशाळांद्वारे ज्ञान वाटप</li>
                <li>
                  अंधश्रद्धेचा वापर न करता वैज्ञानिक दृष्टिकोनातून समस्या
                  निराकारण
                </li>
              </ul>
            </motion.div>

            {/* लेखन Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-[#921a40] mr-3" />
                <h3 className="text-2xl font-bold text-[#921a40]">लेखन</h3>
              </div>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>काव्यसंग्रह चारू मनीष</li>
                <li>वास्तुशास्त्र फक्त विज्ञानच</li>
                <li>अशक्य ते शक्य करतील स्वामी</li>
                <li>यशस्वी भव</li>
                <li>महिला उद्योजिका, एक राष्ट्रनिर्माती</li>
                <li>विश्वाकर्षण लॉ ऑफ अट्रॅक्शन</li>
                <li>रेकी लेवल १, २, ३</li>
                <li>अंकशास्त्र आणि मोबाईल न्यूमरोलॉजी</li>
              </ul>
            </motion.div>
          </div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-200"
          >
            <div className="flex items-center mb-6">
              <Award className="w-10 h-10 text-[#921a40] mr-4" />
              <h3 className="text-3xl font-bold text-[#921a40]">
                प्रमुख उपक्रम
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">
                  अधिवेशने
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-[#921a40] rounded-full"></span>
                    <span>
                      5 मे 2024 - सासवड येथे राज्यस्तरीय भव्य वास्तु, ज्योतिष,
                      आणि मनशक्ती अधिवेशन
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-[#921a40] rounded-full"></span>
                    <span>
                      7 डिसेंबर 2024 - डोंबिवली येथे राज्यस्तरीय वास्तू अधिवेशन
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800">
                  विशेष कार्य
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-[#921a40] rounded-full"></span>
                    <span>मोफत कार्यशाळांचे आयोजन</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-[#921a40] rounded-full"></span>
                    <span>आदिशक्ती गुरुकुल यूट्यूब चॅनेल</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-[#921a40] rounded-full"></span>
                    <span>वैज्ञानिक दृष्टिकोनातून समस्या निराकरण</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-[#921a40] rounded-full"></span>
                    <span>
                      सकाळ व एग्रोवन पेपर मध्ये २००४ ते २००९ पर्यंत सलग ५ वर्ष
                      लेखन
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#921a40]">
              Our Sacred Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of spiritual and healing
              services.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            {services
              .slice(0, showAllServices ? services.length : 3)
              .map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-[#921a40]/30 transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={service.image}
                      alt={service.category}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end">
                      <div className="text-white mb-2">{service.icon}</div>
                      <h3 className="text-xl font-bold text-white">
                        {service.category}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {service.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#921a40]/10 text-[#921a40] rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {services.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="px-6 py-3 bg-[#921a40] text-white rounded-full hover:bg-[#921a40]/90 transition-colors shadow-lg hover:shadow-xl"
              >
                {showAllServices ? "Show Less" : "View All Services"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section
        ref={videosRef}
        className="py-16 bg-gradient-to-b from-white to-[#921a40]/5"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={videosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#921a40]">
              Featured Videos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of spiritual guidance and healing sessions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={videosInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredVideos
              .slice(0, showAllVideos ? featuredVideos.length : 3)
              .map((video, index) => (
                <motion.a
                  key={index}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#921a40]/10 
                         hover:border-[#921a40]/30 transition-all duration-300 group"
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center
                                group-hover:bg-black/60 transition-all duration-300"
                    >
                      <Youtube
                        className="w-12 h-12 md:w-16 md:h-16 text-white opacity-80 
                                     group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#921a40] mb-2 group-hover:text-[#921a40]/90 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                      Click to watch on YouTube
                    </p>
                  </div>
                </motion.a>
              ))}
          </motion.div>

          {featuredVideos.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllVideos(!showAllVideos)}
                className="px-6 py-3 bg-[#921a40] text-white rounded-full hover:bg-[#921a40]/90 transition-colors shadow-lg hover:shadow-xl"
              >
                {showAllVideos ? "Show Less" : "View All Videos"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
