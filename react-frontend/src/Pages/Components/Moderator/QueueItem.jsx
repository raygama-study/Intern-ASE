// src/Pages/Components/Moderator/QueueItem.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

function Chip({ children, tone = "default" }) {
  const tones = {
    default: "bg-[#F4E7DB] border-[#E8C9B5] text-[#5c3b20]",
    danger:  "bg-[#FDE2E1] border-[#F7B3AF] text-[#B14F47]",
    warn:    "bg-[#FFF1C6] border-[#F6D98C] text-[#8C5A1F]",
    info:    "bg-[#E8F1FF] border-[#C6DBFF] text-[#1E4B91]",
    soft:    "bg-[#F8D9AC]/60 border-[#E8C9B5] text-[#5c3b20]",
    safe:    "bg-[#EAF8E8] border-[#CDEECD] text-[#2F7D32]",
  };
  return (
    <span className={`inline-flex items-center rounded-[8px] border px-3 py-1 text-[14px] font-abhaya ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default function QueueItem({
  excerpt,
  tags = [],
  timeAgo = "",
  riskScore,              // number | undefined
  onApprove,
  onReject,
  onEscalate,
  onHistory,
}) {
  const riskTone = typeof riskScore === "number"
    ? riskScore >= 80
      ? "danger"
      : riskScore >= 50
      ? "warn"
      : "info"
    : undefined;

  return (
    <article className="bg-white rounded-[12px] border border-[#E6E0DA] p-6 shadow-[0_6px_14px_rgba(0,0,0,0.08)] mb-5">
      <div className="flex items-start justify-between gap-4">
        <p className="font-abhaya text-[15px] md:text-[16px] leading-relaxed text-darkText/90">
          {excerpt}
        </p>
        <span className="whitespace-nowrap font-abhaya text-[#C65C33] text-sm">{timeAgo}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t, i) => (
          <Chip key={i} tone={t.tone || "default"}>{t.label}</Chip>
        ))}
        {typeof riskScore === "number" && (
          <Chip tone={riskTone}>Risk {Math.round(riskScore)}</Chip>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onApprove}
          className="h-[40px] px-4 rounded-[10px] bg-[#C65C33] text-white hover:opacity-95 font-abhaya"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={onReject}
          className="h-[40px] px-4 rounded-[10px] border border-[#C65C33] text-[#C65C33] hover:bg-white/60 font-abhaya"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={onEscalate}
          className={`h-[40px] px-4 rounded-[10px] font-abhaya text-white flex items-center gap-2 ${
            riskTone === "danger" ? "bg-[#E34237]" : "bg-[#D94B43]"
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> Escalate Emergency
        </button>
        <button
          type="button"
          onClick={onHistory}
          className="h-[40px] px-4 rounded-[10px] border border-[#E6E0DA] hover:bg-white/60 font-abhaya"
        >
          View Full History
        </button>
      </div>
    </article>
  );
}
