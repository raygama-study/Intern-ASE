import React from "react";

function Bar({ value, bg = "#D9D9D9", fg = "#000000" }) {
  return (
    <div className="h-2 rounded-full" style={{ background: bg }}>
      <div
        className="h-2 rounded-full"
        style={{ width: `${value}%`, background: fg }}
      />
    </div>
  );
}

export default function ProgressCard() {
  return (
    <div className="bg-white rounded-[12px] border border-[#E6E0DA] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
      <h3 className="font-abhaya text-[20px] mb-4">Review Progress</h3>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-abhaya">Daily target reviews (50)</span>
            <span className="font-abhaya">23/50</span>
          </div>
          <Bar value={46} />
        </div>

        <div>
          <div className="font-abhaya text-sm mb-2">Emergency respond time</div>
          <Bar value={95} />
        </div>

        <p className="text-[#C65C33] text-sm mt-1 font-abhaya">Average : 12 min</p>
      </div>
    </div>
  );
}
