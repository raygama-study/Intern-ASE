// src/Pages/Components/Comment/ContentWarningCard.jsx
import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Clock, MessageSquare, Flag } from "lucide-react";
import CommentForm from "./CommentForm";
import triangle from "/src/assets/images/material-symbols_warning-outline-rounded-dark.png";

export default function ContentWarningCard({
  topics,
  text,
  age,
  comments = [],
  onSubmitComment,
  onFlag,            
}) {
  const [show, setShow] = useState(false);

  const totalReplies = comments.length;

  // Ambil komentar terbaru: pakai timestamp kalau ada, kalau tidak fallback ke elemen terakhir
  const preview = useMemo(() => {
    if (!Array.isArray(comments) || comments.length === 0) return null;

    const getTs = (c) =>
      new Date(
        c?.created_at || c?.createdAt || c?.updated_at || c?.updatedAt || c?.time || 0
      ).getTime();

    const withTs = comments.map((c) => ({ c, t: getTs(c) }));
    const hasTs = withTs.some((x) => x.t > 0);

    if (hasTs) {
      return withTs.reduce((a, b) => (b.t > a.t ? b : a), withTs[0]).c;
    }
    // fallback: anggap item paling akhir adalah yang terbaru
    return comments[comments.length - 1];
  }, [comments]);

  return (
    <article
      className="rounded-[10px] px-4 py-4 md:px-5 md:py-5 mb-6 border shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
      style={{ background: "#F6C88D", borderColor: "#E8C9B5" }}
    >
      {/* Warning strip + toggle + report */}
      <div
        className="rounded-[8px] px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: "#F4EBDC", border: "1px solid #E8C9B5" }}
      >
        <div className="flex items-center gap-3">
          <img src={triangle} alt="" aria-hidden className="w-5 h-5" />
          <p className="text-sm md:text-[15px] font-abhaya">
            <span className="font-semibold">Content Warning:</span> {topics}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onFlag && (
            <button
              type="button"
              onClick={onFlag}
              className="inline-flex items-center gap-1 text-[13px] px-2 py-1 rounded hover:bg-black/5"
              title="Report this story"
            >
              <Flag className="w-4 h-4" />
              Report
            </button>
          )}
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="flex items-center gap-2 text-sm font-abhaya rounded-full px-3 py-1 hover:bg-black/5"
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span>{show ? "Hide" : "Show"}</span>
          </button>
        </div>
      </div>

      {/* konten hanya saat show */}
      {show && (
        <p className="mt-4 font-abhaya text-[15px] md:text-base leading-relaxed text-darkText/90">
          {text}
        </p>
      )}

      {/* Meta */}
      <div
        className="mt-4 pt-3 flex items-center justify-between text-sm text-darkText/70 border-t"
        style={{ borderColor: "#E8C9B5" }}
      >
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{age}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{totalReplies}</span>
          </span>
        </div>
        <span>Anonymous • Moderated</span>
      </div>

      {/* Preview reply TERBARU (tampil hanya saat show) */}
      {preview && show && (
        <div className="mt-4">
          <p className="text-xs text-darkText/70 mb-2">Replied —</p>
          <div
            className="rounded-[10px] p-3 md:p-4 border shadow-sm bg-[#F4EBDC]"
            style={{ borderColor: "#E8C9B5" }}
          >
            <div className="flex gap-3">
              <span className="w-[3px] rounded-sm bg-[#C65C33]" aria-hidden />
              <div className="flex-1">
                <p className="font-abhaya text-[15px] leading-relaxed text-darkText">
                  {preview.content || preview.text || ""}
                </p>
                <p className="mt-2 text-xs text-darkText/70">- Anonymous</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form komentar – tetap ada walau konten di-hide */}
      <div className="mt-5">
        <CommentForm onSubmit={(val) => onSubmitComment?.(val)} />
      </div>
    </article>
  );
}
