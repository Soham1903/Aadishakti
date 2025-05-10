import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaChalkboardTeacher, FaBullseye } from 'react-icons/fa'; // Imported nice icons

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'organization', label: 'आदिशक्ती गुरुकुल', icon: <FaUniversity size={24} /> },
    { id: 'founder', label: 'संस्थापक परिचय', icon: <FaChalkboardTeacher size={24} /> },
    { id: 'events', label: 'अधिवेशन व उपक्रम', icon: <FaBullseye size={24} /> },
  ];

  return (
    <div className="bg-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`relative px-6 py-4 text-center flex-1 min-w-[200px] transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'text-[#87161a] font-medium'
                  : 'text-gray-600 hover:text-[#87161a]/80'
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="flex flex-col items-center">
                <span className="mb-1">{tab.icon}</span>
                <span className="text-sm md:text-base">{tab.label}</span>
              </span>
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#87161a]"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
