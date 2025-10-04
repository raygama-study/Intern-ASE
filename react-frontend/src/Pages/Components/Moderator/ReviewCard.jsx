// src/Pages/Components/Moderator/ReviewCard.jsx
import React from "react";

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-[8px] border border-[#E8C9B5] bg-[#F6C88D]/50 px-3 py-1 text-sm font-abhaya text-[#5c3b20]">
      {children}
    </span>
  );
}

export default function ReviewCard({ text, time, tags = [], status, note, onView }) {
  const statusClass =
    status === "Rejected"
      ? "text-red-500"
      : status === "Escalated"
      ? "text-amber-500"
      : "text-green-600";

  return (
    <article className="rounded-[12px] border border-[#E6E0DA] bg-white p-5 shadow-md mb-6">
      <div className="flex items-start justify-between gap-4">
        <p className="font-abhaya text-[16px] leading-relaxed text-darkText">
          {text}
        </p>
        <div className="text-right">
          <p className="font-abhaya text-sm text-[#C65C33]">{time}</p>
          <p className={`font-abhaya text-sm ${statusClass}`}>{status}</p>
        </div>
      </div>

      {tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <Tag key={i}>{typeof t === "string" ? t : t?.label || ""}</Tag>
          ))}
        </div>
      )}

      {note && (
        <div className="mt-4 rounded-[10px] border border-[#E6E0DA] bg-[#EFEFEF]">
          <div className="flex">
            <span className="w-[6px] rounded-l-[10px] bg-[#C65C33]" />
            <div className="flex-1 px-3 py-2">
              <p className="text-sm font-abhaya text-darkText">
                <span className="font-semibold">Moderator Notes:</span> {note}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={onView}
          className="rounded-[10px] border border-[#E6E0DA] px-4 py-2 text-sm font-abhaya hover:bg-[#F5F0EA]"
        >
          View Full History
        </button>
      </div>
    </article>
  );
}
