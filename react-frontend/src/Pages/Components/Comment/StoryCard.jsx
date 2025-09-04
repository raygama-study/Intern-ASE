import React from "react";
import { Clock } from "lucide-react";

export default function StoryCard({ text, age }) {
  return (
    <article
      className="bg-white rounded-[10px] border border-[#E6E0DA] px-4 py-4 md:px-5 md:py-5 mb-6"
      style={{ boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.08)" }}
    >
      <p className="font-abhaya text-[15px] md:text-base leading-relaxed text-darkText">
        {text}
      </p>

      <div className="mt-4 border-t border-[#E6E0DA] pt-3 flex items-center justify-between text-sm text-darkText/70">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{age}</span>
        </div>
        <span>Anonymous • Moderated</span>
      </div>
    </article>
  );
}
