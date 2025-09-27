import React, { useRef, useState } from "react";
import LogoIcon from "/src/assets/images/uil_image-upload.png";
import ShieldIcon from "/src/assets/images/shield.png";
import note from "/src/assets/images/hugeicons_note.png";

import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun2.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun4.png";
import Leaf5 from "/src/assets/images/daun6.png";

export default function MainShareDark({ onReviewAndSubmit }) {
  const [story, setStory] = useState("");
  const [imageName, setImageName] = useState("");
  const fileRef = useRef(null);

  const canSubmit = story.length >= 10;

  return (
    <main className="relative isolate bg-[#2B2521] text-[#EEE3D9] font-abhaya overflow-visible">
      {/* Leaves */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <img src={Leaf1} alt="" aria-hidden="true" draggable="false" className="absolute w-[78px] sm:w-[90px] md:w-[130px] -top-[100px] -left-[125px] rotate-[75deg]" />
        <img src={Leaf3} alt="" aria-hidden="true" draggable="false" className="absolute w-[80px] sm:w-[92px] md:w-[150px] -top-[50px] -right-[150px] -rotate-[130deg]" />
        <img src={Leaf2} alt="" aria-hidden="true" draggable="false" className="absolute w-[88px] sm:w-[100px] md:w-[150px] top-[180px] -left-[120px] rotate-[115deg]" />
        <img src={Leaf4} alt="" aria-hidden="true" draggable="false" className="absolute w-[86px] sm:w-[98px] md:w-[150px] bottom-[25px] -left-[150px] rotate-[80deg]" />
        <img src={Leaf5} alt="" aria-hidden="true" draggable="false" className="absolute w-[92px] sm:w-[110px] md:w-[220px] bottom-[25px] -right-[130px] rotate-[100deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-4 py-8 md:py-1">
        {/* Privacy banner – pakai accent 40% */}
        <div
          className="rounded-[12px] px-6 py-7 mb-7"
          style={{ background: "#80311366" }}
        >
          <div className="flex items-start gap-4 ">
            <img src={ShieldIcon} alt="" className="w-9 h-7 mt-2" />
            <p className="text-[15px] md:text-[18.5px] leading-tight text-[#EEE3D9]">
              <strong>Complete Privacy:</strong> No account required, no tracking, no personal
              data collected. Your story will be anonymous and any metadata will be automatically removed.
            </p>
          </div>
        </div>

        {/* Card editor – dark card + warm edge */}
        <div
          className="rounded-[12px] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.35)] border border-[#B36B1C]/40"
          style={{
            backgroundImage:
              "linear-gradient(98.51deg, #A84F1A 0%, rgba(217,111,50,0.35) 100%)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[20px] md:text-[22px] font-semibold text-[#EEE3D9]">Your anonymous story</h2>

            <div className="flex items-center gap-2">
              {imageName && (
                <span className="text-xs text-white/75 max-w-[180px] truncate">{imageName}</span>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageName(e.target.files?.[0]?.name || "")}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="border border-[#D96F32] text-sm px-3 py-1 rounded flex items-center gap-1 hover:bg-[#D96F32] hover:text-white transition-colors"
                aria-label="Upload image"
              >
                <img src={LogoIcon} alt="" className="w-4 h-4" aria-hidden="true" />
                Image
              </button>
            </div>
          </div>

          <div className="bg-[#2B2521] rounded-[10px] p-7">
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={10}
              className="w-full bg-transparent rounded-md p-0 text-[15px] md:text-[16px] font-serif resize-none outline-none text-[#EEE3D9]"
              placeholder="share your experience, thoughts or feelings. Take your time and write as much or as little as feels right for you."
              maxLength={5000}
              aria-label="Your anonymous story"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm text-white/80 mt-2">
            <span>{story.length}/5000 characters</span>
            <span>Stories are reviewed before publication</span>
          </div>
        </div>

        <p className="text-sm text-white/80 flex items-center gap-2 mt-3">
          <img src={note} alt="" className="w-4 h-4" />
          Please write at least 10 characters to submit your story
        </p>

        <div className="flex justify-center mt-5">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => canSubmit && onReviewAndSubmit?.(story)}
            className={`px-6 py-2 rounded-[10px] text-lg text-white font-abhaya
              ${canSubmit ? "bg-[#C65C33] hover:opacity-95 shadow-[0_8px_22px_rgba(198,92,51,0.45)]" : "bg-[#C65C33]/60 cursor-not-allowed"}`}
          >
            Review &amp; Submit
          </button>
        </div>
      </div>
    </main>
  );
}
