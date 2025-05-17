import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://vedicfeed.com/wp-content/uploads/2018/12/Jyotish-Shastra-Facts.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/70"></div>
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-serif text-white drop-shadow-lg">
              आदिशक्ती गुरुकुल
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="w-32 h-[2px] bg-[#d4af37] mx-auto mb-10"></div>

            <p className="text-2xl md:text-3xl font-semibold mb-6 text-white drop-shadow-md">
              ज्योतिषाचार्य सौ. चारुशीला श्रीकांत कांबळे (शिंपी)
            </p>

            <p className="text-xl md:text-2xl font-light text-white drop-shadow-md">
              आदिशक्ति गुरुकुल ज्योतिष संशोधन केंद्र सासवड, जि. पुणे
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
