import React, { useState } from "react";
import { Eye, EyeOff, Clock } from "lucide-react";
import triangle from "/src/assets/images/material-symbols_warning-outline-rounded-dark.png";

export default function ContentWarningCard({ topics, text, age }) {
  const [show, setShow] = useState(false);

  return (
    <article
      className="bg-white rounded-[10px] border border-[#E6E0DA] px-4 py-4 md:px-5 md:py-5 mb-6"
    >
      {/* Warning bar */}
      <div
        className="rounded-[8px] px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: "rgba(198,92,51,0.08)", border: "1px solid #C65C33" }}
      >
        <div className="flex items-center gap-3">
          <img src={triangle} alt="" aria-hidden className="w-5 h-5" />
          <p className="text-sm md:text-[15px] font-abhaya">
            <span className="font-semibold">Content Warning:</span> {topics}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="flex items-center gap-2 text-sm font-abhaya rounded-full px-3 py-1 hover:bg-black/5"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          <span>{show ? "Hide" : "Show"}</span>
        </button>
      </div>

      {show && (
        <p className="mt-4 font-abhaya text-[15px] md:text-base leading-relaxed text-darkText">
          {text}
        </p>
      )}

      <div className="mt-4 border-t border-[#E6E0DA] pt-3 flex items-center justify-between text-sm text-darkText/70">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{age}</span>
        </div>
        <span>Anonymous • Moderated</span>
      </div>
    </article>
  );
}
