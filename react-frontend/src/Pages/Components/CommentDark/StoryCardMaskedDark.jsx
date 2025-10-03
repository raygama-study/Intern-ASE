import React, { useState } from "react";
import { Eye, EyeOff, Clock, MessageSquare, Flag } from "lucide-react";
import CommentFormDark from "./CommentFormDark";

export default function StoryCardMaskedDark({
  topics = "Sensitive content",
  text,
  age,
  comments = [],
  onSubmitComment,
  onFlag,
}) {
  const [show, setShow] = useState(false);
  const totalReplies = comments.length;
  const preview = totalReplies > 0 ? comments[0] : null;

  return (
    <article
      className="rounded-[10px] px-4 py-4 md:px-5 md:py-5 mb-6 border shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
      style={{ background: "#F6C88D", borderColor: "#E8C9B5" }}
    >
      <div
        className="rounded-[8px] px-4 py-3 mb-2 flex items-center justify-between"
        style={{ background: "#F4EBDC", border: "1px solid #00000040", color: "#00000099" }}
      >
        <p className="text-sm md:text-[15px] font-abhaya">
          <span className="font-semibold">Content Warning:</span> {topics}
        </p>

        <div className="flex items-center gap-2">
          {onFlag && (
            <button
              type="button"
              onClick={onFlag}
              className="inline-flex items-center gap-1 text-[13px] px-2 py-1 rounded hover:bg-black/5"
              title="Report this story"
              aria-label="Report this story"
              style={{ color: "#00000099" }}
            >
              <Flag className="w-4 h-4" />
              Report
            </button>
          )}
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="flex items-center gap-2 text-sm font-abhaya rounded px-3 py-1 hover:bg-black/5"
            style={{ color: "#00000099" }}
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span>{show ? "Hide" : "Show"}</span>
          </button>
        </div>
      </div>

      {show && (
        <p className="font-abhaya text-[15px] md:text-base leading-relaxed" style={{ color: "#00000099" }}>
          {text}
        </p>
      )}

      <div
        className="mt-4 pt-3 flex items-center justify-between text-sm border-t"
        style={{ borderColor: "#E8C9B5", color: "#00000099" }}
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

      {preview && (
        <div className="mt-4">
          <p className="text-xs mb-2" style={{ color: "#00000099" }}>Replied —</p>
          <div
            className="rounded-[10px] p-3 md:p-4 border shadow-sm"
            style={{ background: "#3A322E", borderColor: "#B36B1C", color: "#EEE3D9" }}
          >
            <div className="flex gap-3">
              <span className="w-[3px] rounded-sm" style={{ background: "#C65C33" }} aria-hidden />
              <div className="flex-1">
                <p className="font-abhaya text-[15px] leading-relaxed">
                  {preview.content || preview.text || ""}
                </p>
                <p className="mt-2 text-xs opacity-70">- Anonymous</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <CommentFormDark onSubmit={(val) => onSubmitComment?.(val)} />
      </div>
    </article>
  );
}
