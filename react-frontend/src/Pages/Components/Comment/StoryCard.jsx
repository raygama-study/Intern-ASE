// src/Pages/Components/Comment/StoryCard.jsx
import React, { useMemo } from "react";
import { Clock, MessageSquare, Flag } from "lucide-react";
import CommentForm from "./CommentForm";

export default function StoryCard({ text, age, comments = [], onSubmitComment, onFlag }) {
  const totalReplies = comments.length;

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
    return comments[comments.length - 1];
  }, [comments]);

  return (
    <article
      className="rounded-[10px] px-4 py-4 md:px-5 md:py-5 mb-6 border shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
      style={{ background: "#F6C88D", borderColor: "#E8C9B5" }}
    >
      <p className="font-abhaya text-[15px] md:text-base leading-relaxed text-darkText/90">
        {text}
      </p>

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

        <div className="flex items-center gap-3">
          <span>Anonymous • Moderated</span>
          {onFlag && (
            <button
              type="button"
              onClick={onFlag}
              className="inline-flex items-center gap-1 rounded-[8px] border px-2 py-1 text-xs hover:bg-white/50"
              style={{ borderColor: "#C65C33", color: "#C65C33" }}
              aria-label="Report this story"
              title="Report"
            >
              <Flag className="w-3.5 h-3.5" /> Report
            </button>
          )}
        </div>
      </div>

      {preview && (
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

      <div className="mt-5">
        <CommentForm onSubmit={(val) => onSubmitComment?.(val)} />
      </div>
    </article>
  );
}
