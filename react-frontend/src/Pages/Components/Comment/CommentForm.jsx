import React, { useState } from "react";
import { Image as ImageIcon, MapPin, Smile } from "lucide-react";

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e?.preventDefault();
    const val = text.trim();
    if (!val) return;
    onSubmit?.(val); 
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[12px] p-4 shadow-[0_6px_14px_rgba(0,0,0,0.12)]"
      style={{ background: "#F6C88D" }}
    >
      {/* area tulis */}
      <div className="rounded-[8px] border border-[#E8C9B5] bg-[#F4EBDC]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your comment"
          className="w-full min-h-[120px] bg-transparent p-3 outline-none resize-y font-abhaya text-[15px]"
        />
      </div>

      {/* bar bawah */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[#1e1e1e]">
          <ImageIcon className="w-5 h-5 opacity-80" aria-hidden />
          <MapPin className="w-5 h-5 opacity-80" aria-hidden />
          <Smile className="w-5 h-5 opacity-80" aria-hidden />
        </div>

        <button
          type="submit"
          className="rounded-[8px] px-4 py-1.5 text-white font-abhaya hover:opacity-95"
          style={{ background: "#C65C33", boxShadow: "0 8px 22px rgba(198,92,51,.25)" }}
        >
          Send
        </button>
      </div>
    </form>
  );
}
