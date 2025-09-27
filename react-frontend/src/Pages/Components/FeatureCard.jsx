// src/Pages/Components/FeatureCard.jsx
import React from "react";

export default function FeatureCard({ icon, title, description, className = "" }) {
  const base =
    "rounded-[12px] border " +
    "transform-gpu transition-transform duration-300 ease-out " +
    "hover:-translate-y-1 " +
    "w-full min-h-[200px] sm:min-h-[220px] lg:min-h-[250px] " +
    "p-5 sm:p-6 lg:p-7";

  return (
    <div className={`${base} ${className}`}>
      <div className="flex flex-col items-center text-center gap-3">
        {icon && (
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 select-none"
            draggable="false"
          />
        )}
        <h3 className="font-aboreto text-[16px] sm:text-[18px] lg:text-[20px]">
          {title}
        </h3>
        <p className="font-abhaya text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.55] opacity-90">
          {description}
        </p>
      </div>
    </div>
  );
}
