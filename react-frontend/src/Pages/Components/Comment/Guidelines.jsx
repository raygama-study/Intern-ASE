import React from "react";
import Heart from "/src/assets/images/love-dark.png";

export default function Guidelines() {
  return (
    <div
      className="rounded-[10px] px-4 py-3 md:px-5 md:py-3 mb-6"
      style={{ background: "#F6C88D" }}
    >
      <div className="flex items-center gap-3">
        <img src={Heart} alt="" aria-hidden className="w-5 h-5" />
        <p className="text-sm md:text-[15px] font-abhaya">
          <span className="font-abhaya font-bold">Community Guidelines:</span> These are real,
          anonymous stories from people in our community. Please read with compassion and
          respect. If you're feeling overwhelmed, it's okay to take a break.
        </p>
      </div>
    </div>
  );
}
