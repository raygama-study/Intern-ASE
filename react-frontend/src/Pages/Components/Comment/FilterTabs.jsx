import React from "react";

export default function FilterTabs({ safeOnly, onChange }) {
  return (
    <div className="mt-6 mb-6 flex items-center justify-center gap-4">
      <button
        type="button"
        aria-pressed={safeOnly}
        onClick={() => onChange(true)}
        className={`h-[40px] px-5 rounded-[10px] font-abhaya transition
          ${safeOnly ? "bg-[#C65C33] text-white" : "bg-background text-[#C65C33] border border-[#C65C33]"}`}
      >
        Safe Content Only
      </button>

      <button
        type="button"
        aria-pressed={!safeOnly}
        onClick={() => onChange(false)}
        className={`h-[40px] px-5 rounded-[10px] font-abhaya transition
          ${!safeOnly ? "bg-[#C65C33] text-white" : "bg-background text-[#C65C33] border border-[#C65C33]"}`}
      >
        All Stories
      </button>
    </div>
  );
}
