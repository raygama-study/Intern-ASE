import React, { useState } from "react";
import { Clock, MessageSquare, Eye, EyeOff } from "lucide-react";
import CommentForm from "./CommentForm";
import triangle from "/src/assets/images/material-symbols_warning-outline-rounded-dark.png";

export default function StoryCardMasked({
  text,
  topics = "Sensitive content",
  age,
  comments = [],
  onSubmitComment,
}) {
  const [show, setShow] = useState(false);
  const totalReplies = comments.length;
  const preview = totalReplies > 0 ? comments[0] : null;

  return (
    <article
      className="rounded-[10px] px-4 py-4 md:px-5 md:py-5 mb-6 border shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
      style={{ background: "#F6C88D", borderColor: "#E8C9B5" }}
    >
      {/* strip warning + toggle */}
      <div
        className="rounded-[8px] px-3 py-2 flex items-center justify-between"
        style={{ background: "#F4EBDC", border: "1px solid #E8C9B5" }}
      >
        <div className="flex items-center gap-2">
          <img src={triangle} alt="" className="w-5 h-5" aria-hidden />
          <p className="text-sm md:text-[15px] font-abhaya">
            <span className="font-semibold">Content Warning:</span> {topics}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="flex items-center gap-2 text-sm font-abhaya rounded-full px-3 py-1 hover:bg-black/5"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          <span>{show ? "Hide" : "Show"}</span>
        </button>
      </div>

      {/* konten cerita: disembunyikan saat show=false */}
      <div className="mt-4">
        {show ? (
          <p className="font-abhaya text-[15px] md:text-base leading-relaxed text-darkText/90">
            {text}
          </p>
        ) : (
          <div
            className="rounded-[8px] px-3 py-3 text-darkText/60 font-abhaya text-[14px]"
            style={{ background: "#F4EBDC", border: "1px dashed #E8C9B5" }}
          >
            Content hidden. Tap <span className="font-semibold">Show</span> to view.
          </div>
        )}
      </div>

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

      {/* preview balasan pertama (jika ada) */}
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
