import React from "react";
import { Clock, MessageSquare } from "lucide-react";
import CommentForm from "./CommentForm";

export default function StoryCard({ text, age, comments = [], onSubmitComment }) {
  const totalReplies = comments.length;
  const preview = totalReplies > 0 ? comments[0] : null;

  return (
    <article
      className="rounded-[10px] px-4 py-4 md:px-5 md:py-5 mb-6 border shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
      style={{ background: "#F6C88D", borderColor: "#E8C9B5" }}
    >
      {/* isi cerita */}
      <p className="font-abhaya text-[15px] md:text-base leading-relaxed text-darkText/90">
        {text}
      </p>

      {/* meta */}
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

      {/* preview reply pertama */}
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

      {/* form komentar */}
      <div className="mt-5">
        <CommentForm onSubmit={(val) => onSubmitComment?.(val)} />
      </div>
    </article>
  );
}
