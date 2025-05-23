import React from 'react';
import { Building2, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'organization', label: 'संस्था परिचय', icon: Building2 },
    { id: 'founder', label: 'संस्थापक परिचय', icon: User },
    { id: 'events', label: 'उपक्रम', icon: Calendar },
  ];

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm py-2 rounded-lg -mt-8">
      <div className="flex justify-center">
        <div className="flex space-x-1 md:space-x-4 p-1 bg-slate-100 rounded-lg">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-3 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium
                  transition-all duration-200 flex items-center
                  ${isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#87161a]/90 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center">
                  <tab.icon className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;