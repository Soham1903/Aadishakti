import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/2078126/pexels-photo-2078126.jpeg?auto=compress&cs=tinysrgb&w=1280')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-serif text-[#87161a] drop-shadow-sm">
              आदिशक्ती गुरुकुल
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="w-32 h-[2px] bg-[#87161a]/80 mx-auto mb-10"></div>
            
            <p className="text-2xl md:text-3xl font-medium mb-6 text-[#000000] drop-shadow-sm">
              ज्योतिषाचार्य सौ. चारुशीला श्रीकांत कांबळे (शिंपी)
            </p>
            
            <p className="text-xl md:text-2xl font-light text-[#000000] drop-shadow-sm">
              आदिशक्ति गुरुकुल ज्योतिष संशोधन केंद्र सासवड, जि. पुणे
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;