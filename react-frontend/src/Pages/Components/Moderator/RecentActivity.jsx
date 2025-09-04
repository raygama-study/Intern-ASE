import React from "react";

function Dot({ color = "#16a34a" }) {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

function Row({ color, text, time }) {
  return (
    <div className="flex items-center justify-between bg-[#F4F0EB] rounded-[10px] px-4 py-3">
      <div className="flex items-center gap-3">
        <Dot color={color} />
        <span className="font-abhaya text-sm md:text-[15px]">{text}</span>
      </div>
      <span className="font-abhaya text-sm text-darkText/70">{time}</span>
    </div>
  );
}

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-[12px] border border-[#E6E0DA] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
      <h3 className="font-abhaya text-[20px] mb-4">Recent Activity</h3>

      <div className="space-y-3">
        <Row color="#22c55e" text="Story #4321 Approved by Amba" time="2 min ago" />
        <Row color="#ef4444" text="Emergency Case #2567 escalated" time="5 min ago" />
        <Row color="#f59e0b" text="Story #3245 flag for review" time="7 min ago" />
      </div>
    </div>
  );
}
