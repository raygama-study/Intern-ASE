import React from "react";

export default function StatCard({ title, value, delta, icon }) {
  return (
    <div
      className="bg-white rounded-[12px] border border-[#E6E0DA] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-abhaya text-[16px]">{title}</p>
        <div>{icon}</div>
      </div>
      <div className="font-abhaya text-[32px] leading-none mb-2">{value}</div>
      <p className="text-[12px] text-darkText/70">{delta}</p>
    </div>
  );
}
