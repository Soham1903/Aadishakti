import React from "react";

export const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-medium text-slate-800 inline-block mb-2 relative">
        {title}
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#87161a]/70 rounded-full"></span>
      </h2>
      {subtitle && <p className="text-slate-600 mt-4 text-lg">{subtitle}</p>}
    </div>
  );
};