// src/Pages/Components/Moderator/ReviewStoryModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function Chip({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-[8px] px-3 py-1 text-sm font-abhaya border"
      style={{
        background: "#F6C88D",
        borderColor: "#E8C9B5",
        color: "#5c3b20",
      }}
    >
      {children}
    </span>
  );
}

export default function ReviewStoryModal({
  open,
  onClose,
  item,
  onApprove,
  onReject,
  busy = false,
}) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // reset saat modal ganti item / dibuka ulang
    setNotes("");
  }, [item?.id, open]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-auto py-10">
      <div
        className="relative w-[min(980px,92vw)] rounded-[16px] border shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
        style={{ background: "#F4EBDC", borderColor: "#E8C9B5" }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          className="absolute top-5 right-5 grid place-items-center rounded-full p-1.5 hover:bg-black/5"
          aria-label="Close"
          title="Close"
        >
          <X className="w-7 h-7" />
        </button>

        <div className="px-8 md:px-10 pt-8 pb-8">
          {/* Title */}
          <h2
            className="font-aboreto text-[26px] md:text-[30px] tracking-wide mb-6"
            style={{ color: "#2B2521" }}
          >
            STORY DETAILS-ID:{item.id}
          </h2>

          {/* Full content */}
          <p className="font-abhaya text-[18px] leading-[1.65] mb-8" style={{ color: "#2B2521" }}>
            <span className="block font-semibold text-[19px] mb-3">Full Content:</span>
            {item.content}
          </p>

          {/* AI classifications */}
          <div className="mb-8">
            <p className="font-abhaya font-semibold text-[18px] mb-3" style={{ color: "#2B2521" }}>
              AI Classifications :
            </p>
            <div className="flex flex-wrap gap-2">
              {(item.aiTags || []).length === 0 ? (
                <span className="text-sm font-abhaya opacity-70">No tags</span>
              ) : (
                (item.aiTags || []).map((t, i) => <Chip key={`${t}-${i}`}>{t}</Chip>)
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <p className="font-abhaya font-semibold text-[18px] mb-3" style={{ color: "#2B2521" }}>
              Moderator Notes :
            </p>
            <textarea
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={busy}
              placeholder="Add your reviews Notes here"
              className="w-full rounded-[10px] font-abhaya text-[16px] outline-none"
              style={{
                background: "#EDEAE5",
                border: "1px solid #E8C9B5",
                padding: "14px 16px",
                color: "#2B2521",
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onApprove?.({ notes })}
              disabled={busy}
              className="h-[44px] px-5 rounded-[10px] font-abhaya text-white disabled:opacity-60"
              style={{ background: "#2F7D32", boxShadow: "0 8px 18px rgba(47,125,50,0.25)" }}
            >
              Approve Story
            </button>
            <button
              type="button"
              onClick={() => onReject?.({ notes })}
              disabled={busy}
              className="h-[44px] px-5 rounded-[10px] font-abhaya disabled:opacity-60"
              style={{
                border: "1px solid #D94B43",
                color: "#D94B43",
                background: "transparent",
              }}
            >
              Reject Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
