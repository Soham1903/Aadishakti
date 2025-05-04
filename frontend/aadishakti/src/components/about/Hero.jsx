import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden pt-[100px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#921a40]/90 to-[#921a40]/70"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-serif">
            आदिशक्ती गुरुकुल
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light mb-4">
            ज्योतिषाचार्य सौ. चारुशीला श्रीकांत कांबळे (शिंपी)
          </p>
          <p className="text-lg md:text-xl font-light">
            आदिशक्ति गुरुकुल ज्योतिष संशोधन केंद्र सासवड, जि. पुणे
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
