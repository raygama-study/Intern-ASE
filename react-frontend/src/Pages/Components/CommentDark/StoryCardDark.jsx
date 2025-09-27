import React from "react";
import { Clock, MessageSquare } from "lucide-react";
import CommentFormDark from "./CommentFormDark";

export default function StoryCardDark({
  text,
  age,
  comments = [],
  onSubmitComment,
}) {
  const totalReplies = comments.length;
  const preview = totalReplies > 0 ? comments[0] : null;

  return (
    <article
      className="rounded-[10px] px-4 py-4 md:px-5 md:py-5 mb-6 border shadow-[0_8px_18px_rgba(0,0,0,0.35)] text-[#EEE3D9]"
      style={{ background: "#A84F1A", borderColor: "rgba(179,107,28,0.35)" }}
    >
      {/* isi cerita */}
      <p className="font-abhaya text-[15px] md:text-base leading-relaxed">
        {text}
      </p>

      {/* meta */}
      <div
        className="mt-4 pt-3 flex items-center justify-between text-sm border-t"
        style={{ borderColor: "rgba(179,107,28,0.35)" }}
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

      {/* preview satu reply */}
      {preview && (
        <div className="mt-4">
          <p className="text-xs text-white/80 mb-2">Replied —</p>
          <div
            className="rounded-[10px] p-3 md:p-4 border shadow-sm"
            style={{ background: "#2B2521", borderColor: "rgba(179,107,28,0.35)" }}
          >
            <div className="flex gap-3">
              <span className="w-[3px] rounded-sm bg-[#C65C33]" aria-hidden />
              <div className="flex-1">
                <p className="font-abhaya text-[15px] leading-relaxed text-[#EEE3D9]">
                  {preview.content || preview.text || ""}
                </p>
                <p className="mt-2 text-xs text-white/70">- Anonymous</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* form komentar */}
      <div className="mt-5">
        <CommentFormDark onSubmit={(val) => onSubmitComment?.(val)} />
      </div>
    </article>
  );
}
