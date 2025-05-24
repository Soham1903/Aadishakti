import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const [counts, setCounts] = useState({
    clients: 0,
    consultations: 0,
    accuracy: 0,
    workshops: 0,
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const targets = {
    clients: 5000,
    consultations: 7500,
    accuracy: 90,
    workshops: 500,
  };

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setCounts((prev) => ({
          clients:
            prev.clients < targets.clients
              ? Math.min(prev.clients + 100, targets.clients)
              : prev.clients,
          consultations:
            prev.consultations < targets.consultations
              ? Math.min(prev.consultations + 300, targets.consultations)
              : prev.consultations,
          accuracy:
            prev.accuracy < targets.accuracy
              ? Math.min(prev.accuracy + 2, targets.accuracy)
              : prev.accuracy,
          workshops:
            prev.workshops < targets.workshops
              ? Math.min(prev.workshops + 10, targets.workshops)
              : prev.workshops,
        }));
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView]);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-slate-800 inline-block mb-2 relative">
            आमची वैदिक कामगिरी
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#87161a]/70 rounded-full"></span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            className="text-center bg-slate-50 rounded-xl p-8 shadow-sm"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#87161a] mb-3">
              {counts.clients.toLocaleString()}+
            </div>
            <p className="text-slate-600 font-medium">विद्यार्थी</p>
          </motion.div>
          
          <motion.div
            className="text-center bg-slate-50 rounded-xl p-8 shadow-sm"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#87161a] mb-3">
              {counts.consultations.toLocaleString()}+
            </div>
            <p className="text-slate-600 font-medium">सल्ला सत्रे</p>
          </motion.div>
          
          <motion.div
            className="text-center bg-slate-50 rounded-xl p-8 shadow-sm"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#87161a] mb-3">
              {counts.accuracy}%
            </div>
            <p className="text-slate-600 font-medium">भविष्यवाणी अचूकता</p>
          </motion.div>
          
          <motion.div
            className="text-center bg-slate-50 rounded-xl p-8 shadow-sm"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#87161a] mb-3">
              {counts.workshops}+
            </div>
            <p className="text-slate-600 font-medium">कार्यशाळा</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;