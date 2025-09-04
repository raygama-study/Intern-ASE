// src/Pages/Components/Moderator/EmergencyCaseCard.jsx
import React from "react";
import { AlertOctagon } from "lucide-react";

function Tag({ label, tone = "danger" }) {
  const cls =
    tone === "warn"
      ? "bg-[#F6E3BE] border-[#E9CA97] text-[#8C5A1F]"
      : "bg-[#FDE4E4] border-[#E8A7A6] text-[#B14F47]";
  return (
    <span
      className={`rounded-[8px] border px-3 py-1 text-sm font-abhaya ${cls}`}
    >
      {label}
    </span>
  );
}

export default function EmergencyCaseCard({ text, time, tags = [] }) {
  return (
    <article className="rounded-[10px] bg-white border border-[#E6E0DA] shadow-[0_4px_12px_rgba(0,0,0,0.07)] p-5 mb-6">
      <div className="flex items-start justify-between gap-4">
        <p className="font-abhaya text-[15px] md:text-base leading-relaxed text-darkText">
          {text}
        </p>
        <span className="text-[#C65C33]/80 text-sm whitespace-nowrap">
          {time}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((t, i) => (
          <Tag key={i} label={t.label} tone={t.tone} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-[8px] bg-[#C65C33] text-white h-[40px] px-4 hover:opacity-95"
        >
          Approve
        </button>
        <button
          type="button"
          className="rounded-[8px] border border-[#C65C33] text-[#C65C33] h-[40px] px-4 bg-white hover:bg-white/50"
        >
          Reject
        </button>
        <button
          type="button"
          className="rounded-[8px] bg-[#D94B43] text-white h-[40px] px-4 flex items-center gap-2 hover:opacity-95"
        >
          <AlertOctagon className="w-4 h-4" />
          Escalate Emergency
        </button>
        <button
          type="button"
          className="rounded-[8px] border border-[#C65C33] text-[#C65C33] h-[40px] px-4 bg-white hover:bg-white/50"
        >
          View Full History
        </button>
      </div>
    </article>
  );
}
