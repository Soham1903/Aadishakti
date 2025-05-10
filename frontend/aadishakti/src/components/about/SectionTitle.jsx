import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      <div className="mt-4 flex justify-center">
        <div className="w-16 h-1 bg-[#87161a] rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default SectionTitle;
