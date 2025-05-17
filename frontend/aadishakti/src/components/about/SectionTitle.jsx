import React from "react";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#87161a] inline-block mb-2">
        {title}
      </h2>
      <div className="w-1/4 h-1 bg-[#d4af37] rounded-full mx-auto mb-4" />
      {subtitle && <p className="text-gray-600 mt-3 text-lg">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
