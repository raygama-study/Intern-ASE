import React, { useState } from "react";
import { Eye, EyeOff, Clock } from "lucide-react";
import triangle from "/src/assets/images/material-symbols_warning-outline-rounded-dark.png";

export default function ContentWarningCard({ topics, text, age }) {
  const [show, setShow] = useState(false);

  return (
    <article
      className="bg-white rounded-[10px] border border-[#E6E0DA] px-4 py-4 md:px-5 md:py-5 mb-6"
      style={{ boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.08)" }}
    >
      {/* bar peringatan */}
      <div
        className="rounded-[8px] px-4 py-3 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(198,92,51,0.08)", // tipis dari primary
          border: "1px solid rgba(198,92,51,1)",
        }}
      >
        <div className="flex items-center gap-3">
          <img src={triangle} className="w-5 h-5" style={{ color: "#C65C33" }} />
          <p className="text-sm md:text-[15px] font-abhaya">
            <span className="font-semibold">Content Warning:</span> {topics}
          </p>
        </div>

        {/* tombol pill Show/Hide (outline primary) */}
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="flex items-center gap-2 text-sm font-abhaya rounded-full px-3 py-1"
          style={{
            color: "#000000ff",
            backgroundColor: "transparent",
          }}
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          <span>{show ? "Hide" : "Show"}</span>
        </button>
      </div>

      {/* isi cerita */}
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
