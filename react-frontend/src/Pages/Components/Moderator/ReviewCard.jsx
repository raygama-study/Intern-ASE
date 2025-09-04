import React from "react";

function Tag({ children }) {
  return (
    <span className="rounded-[8px] border border-[#E9CA97] bg-[#F6E3BE] text-[#8C5A1F] px-3 py-1 text-sm font-abhaya">
      {children}
    </span>
  );
}

function StatusPill({ status = "Approved" }) {
  // bisa di-extend kalau ada Rejected/Pending
  return (
    <span className="rounded-full border border-[#CDEECD] bg-[#EAF8E8] text-[#2F7D32] px-3 py-1 text-xs font-abhaya">
      {status}
    </span>
  );
}

export default function ReviewCard({ text, time, tags = [], status, note }) {
  return (
    <article className="rounded-[10px] bg-white border border-[#E6E0DA] shadow-[0_4px_12px_rgba(0,0,0,0.07)] p-5 mb-6">
      {/* header row */}
      <div className="flex items-start justify-between gap-4">
        <p className="font-abhaya text-[15px] md:text-base leading-relaxed text-darkText">
          {text}
        </p>
        <div className="text-right shrink-0">
          <p className="text-[#C65C33]/80 text-sm">{time}</p>
          <div className="mt-2 flex justify-end">
            <StatusPill status={status} />
          </div>
        </div>
      </div>

      {/* tags */}
      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((t, i) => (
          <Tag key={i}>{t}</Tag>
        ))}
      </div>

      {/* moderator notes */}
      <div className="mt-5 rounded-[8px] bg-[#F5F2EE] border border-[#E6E0DA] p-4 relative">
        <span className="absolute left-0 top-0 bottom-0 w-[6px] rounded-l-[8px] bg-[#C65C33]" aria-hidden="true" />
        <p className="font-abhaya text-[15px]">
          <span className="font-semibold">Moderator Notes:</span> {note}
        </p>
      </div>

      {/* actions */}
      <div className="mt-5">
        <button
          type="button"
          className="rounded-[8px] border border-[#C65C33] text-[#C65C33] h-[38px] px-4 bg-white hover:bg-white/60 font-abhaya"
        >
          View Full History
        </button>
      </div>
    </article>
  );
}
