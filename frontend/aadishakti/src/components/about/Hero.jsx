import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('assets/AboutOrganization/Jyotish.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80"></div>
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white">
              आदिशक्ती गुरुकुल
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="w-32 h-[1px] bg-white/40 mx-auto mb-8"></div>

            <p className="text-xl md:text-2xl font-medium mb-4 text-white">
              ज्योतिषाचार्य सौ. चारुशीला श्रीकांत कांबळे (शिंपी)
            </p>
            <p className="text-lg md:text-xl font-normal text-white/90">
              संपर्क - 9130755631 / 9657196333
            </p>

            <p className="text-lg md:text-xl font-normal text-white/90">
              आदिशक्ति गुरुकुल ज्योतिष संशोधन केंद्र सासवड, जि. पुणे
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
