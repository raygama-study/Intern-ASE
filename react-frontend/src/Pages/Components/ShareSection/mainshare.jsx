// src/Pages/Components/ShareSection/mainshare.jsx
import React, { useState } from "react";
import LogoIcon from "/src/assets/images/uil_image-upload.png";
import ShieldIcon from "/src/assets/images/shield.png";
import note from "/src/assets/images/hugeicons_note.png";
import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun2.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun4.png";
import Leaf5 from "/src/assets/images/daun5.png";
import Leaf6 from "/src/assets/images/daun6.png";

export default function MainShare({ onReviewAndSubmit }) {
  const [story, setStory] = useState("");
  const canSubmit = story.length >= 10;

  return (
    <main className="font-abhaya">
      <div className="relative">
        <img src={Leaf1} alt="Leaf 1" className="absolute top-0 left-0 w-32 h-32" />
        <img src={Leaf2} alt="Leaf 2" className="absolute top-0 right-0 w-32 h-32" />
        <img src={Leaf3} alt="Leaf 3" className="absolute bottom-0 left-0 w-32 h-32" />
        <img src={Leaf4} alt="Leaf 4" className="absolute bottom-0 right-0 w-32 h-32" />
        <img src={Leaf5} alt="Leaf 5" className="absolute top-1/2 left-1/2 w-32 h-32" />
        <img src={Leaf6} alt="Leaf 6" className="absolute top-1/2 right-1/2 w-32 h-32" />
      </div>
      {/* COMPLETE PRIVACY — 40% opacity + kontras */}
      <div
        className="rounded-[12px] px-6 py-4 mb-6 max-w-[980px] mx-auto
                   border border-[#C65C33]/35 shadow-[0_8px_18px_rgba(0,0,0,0.10)]"
        style={{ backgroundColor: "rgba(252, 199, 131, 0.4)" }} 
      >
        <div className="flex items-start gap-3 text-darkText">
          <img src={ShieldIcon} alt="Shield Icon" className="w-5 h-5 mt-1" />
          <p className="text-[16px] leading-tight">
            <strong>Complete Privacy:</strong> No account required, no tracking, no personal data
            collected. Your story will be anonymous and any metadata will be automatically removed.
          </p>
        </div>
      </div>

      {/* STORY INPUT — frame gradient sesuai Figma */}
      <div
        className="rounded-[12px] p-4 max-w-[980px] mx-auto shadow-[0_8px_18px_rgba(0,0,0,0.12)]
                   text-darkText border border-[#C65C33]/40"
        style={{
          backgroundImage:
            "linear-gradient(98.51deg, #F7B058 0%, rgba(217, 111, 50, 0.7) 100%)",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[20px] md:text-[22px] font-semibold">Your anonymous story</h2>

          {/* Image (outline) */}
          <button
            type="button"
            className="text-[#C65C33] border border-[#C65C33] bg-transparent
                       text-sm px-4 py-1 rounded flex items-center gap-1 hover:bg-[#C65C33]/10"
          >
            <img src={LogoIcon} alt="" className="w-4 h-4" aria-hidden="true" />
            Image
          </button>
        </div>

        {/* editor (inner cream box) */}
        <div className="bg-background rounded-[10px] p-3">
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={10}
            className="w-full bg-transparent rounded-md p-0 text-sm font-serif resize-none outline-none"
            aria-label="Your anonymous story"
            placeholder="share your experience,thoughts or feelings. Take your time dan write as much or as little as feels right for you."
            maxLength={5000}
          />
        </div>

        {/* bottom bar texts */}
        <div className="flex justify-between text-sm text-darkText mt-2">
          <span>{story.length}/5000 characters</span>
          <span>Stories are reviewed before publication</span>
        </div>
      </div>

      {/* note bawah */}
      <p className="text-sm text-darkText flex items-center gap-2 mt-3 max-w-[980px] mx-auto">
        <img src={note} alt="" className="w-4 h-4" />
        Please write at least 10 characters to submit your story
      </p>

      {/* Review & Submit (primary) */}
      <div className="flex justify-center mt-5">
        <button
          type="button"
          onClick={() => canSubmit && onReviewAndSubmit?.(story)}
          className={`px-6 py-2 rounded-[10px] text-lg font-abhaya text-white
            ${canSubmit ? "bg-[#C65C33] hover:opacity-95" : "bg-[#C65C33]/60 cursor-not-allowed"}`}
          disabled={!canSubmit}
        >
          Review &amp; Submit
        </button>
      </div>
    </main>
  );
}
