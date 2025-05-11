import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#87161a] relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-[#d4af37] rounded-full"></span>
      </h2>
      {subtitle && (
        <p className="text-gray-600 mt-3">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;