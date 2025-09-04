import React from "react";
import Heart from "/src/assets/images/icon-park_oval-love-two.png";

export default function Guidelines() {
  return (
    <div
      className="rounded-[10px] px-4 py-3 md:px-5 md:py-3 mb-6"
      style={{
        backgroundColor: "rgba(248,178,89,0.66)", // #F8B25966 biar lembut seperti mockup
        boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.10)",
      }}
    >
      <div className="flex items-center justify-center gap-3">
        <img src={Heart} className="w-5 h-5" style={{ color: "#C65C33" }} />
        <p className="text-sm md:text-[15px] font-abhaya">
          <span className="font-abhay font-bold">Community Guidelines:</span> These are real, anonymous stories from people in
          our community. Please read with compassion and respect. If you’re feeling overwhelmed, it’s okay to take a
          break.
        </p>
      </div>
    </div>
  );
}
