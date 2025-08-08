import React from "react";

const FeatureCard = ({ icon, title, description, className = "" }) => {
  return (
    <div
      className={`bg-background border border-[#ccc] rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center justify-start text-center ${className}`}
    >
      <img src={icon} alt={title} className="w-[40px] h-[40px] mb-4" />
      <h3 className="font-abhaya mb-2 text-[20px]">{title}</h3>
      <p className="font-abhaya text-[16px] text-primary">{description}</p>
    </div>
  );
};

export default FeatureCard;
