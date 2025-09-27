import React, { useState } from "react";
import { Image as ImageIcon, MapPin, Smile } from "lucide-react";

export default function CommentFormDark({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const v = text.trim();
    if (!v) return;
    onSubmit?.(v);
    setText("");
  };

  return (
    <div
      className="rounded-[10px] p-3 md:p-4 border"
      style={{ background: "#A84F1A", borderColor: "rgba(179,107,28,0.35)" }}
    >
      <div
        className="rounded-[8px] p-3 md:p-4"
        style={{ background: "#2B2521" }}
      >
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your comment"
          className="w-full bg-transparent outline-none resize-none font-abhaya text-[15px] md:text-[16px] text-[#EEE3D9] placeholder-[#EEE3D9]/60"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        {/* ikon dummy (BE belum terima gambar) */}
        <div className="flex items-center gap-4 text-white/80">
          <ImageIcon className="w-5 h-5" />
          <MapPin className="w-5 h-5" />
          <Smile className="w-5 h-5" />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="min-w-[84px] h-[36px] rounded-[10px] px-5 font-abhaya text-white disabled:opacity-60"
          style={{ background: "#C65C33", boxShadow: "0 8px 22px rgba(198,92,51,0.35)" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
