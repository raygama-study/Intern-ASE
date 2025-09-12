import React, { useRef, useState } from "react";
import LogoIcon from "/src/assets/images/uil_image-upload.png";
import ShieldIcon from "/src/assets/images/shield.png";
import note from "/src/assets/images/hugeicons_note.png";

// leaves
import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun2.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun4.png";
import Leaf5 from "/src/assets/images/daun6.png";

export default function MainShare({ onReviewAndSubmit }) {
  const [story, setStory] = useState("");
  const [imageName, setImageName] = useState("");
  const fileRef = useRef(null);

  const canSubmit = story.length >= 10;

  return (
    <main className="relative isolate bg-background text-darkText font-abhaya overflow-visible">
      {/* ===== Leaf layer: selalu di bawah konten ===== */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Kiri-atas (sedikit keluar card privacy) */}
        <img
          src={Leaf1}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute w-[78px] sm:w-[90px] md:w-[130px] -top-[100px] -left-[125px] rotate-[75deg]"
        />
        {/* Kanan-atas (dekat tombol Image, tapi tidak menutup) */}
        <img
          src={Leaf3}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute w-[80px] sm:w-[92px] md:w-[150px] -top-[50px] -right-[150px] -rotate-[130deg]"
        />
        {/* Kiri-tengah (di tepi frame) */}
        <img
          src={Leaf2}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute w-[88px] sm:w-[100px] md:w-[150px] top-[180px] -left-[120px] rotate-[115deg]"
        />
        {/* Kiri-bawah (dekat note) */}
        <img
          src={Leaf4}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute w-[86px] sm:w-[98px] md:w-[150px] bottom-[25px] -left-[150px] rotate-[80deg]"
        />
        {/* Kanan-bawah (dekat tombol submit) */}
        <img
          src={Leaf5}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute w-[92px] sm:w-[110px] md:w-[220px] bottom-[25px] -right-[130px] rotate-[100deg]"
        />
      </div>

      {/* ===== Content (di atas daun) ===== */}
    <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-4 py-8 md:py-1">
      {/* Privacy banner */}
      <div
        className="rounded-[12px] px-6 py-7 mb-7"
        style={{ background: "#F8B25966" }} // #F8B25966
      >
        <div className="flex items-start gap-4 ">
          <img src={ShieldIcon} alt="" className="w-9 h-7 mt-2" />
          <p className="text-[15px] md:text-[18.5px] leading-tight">
            <strong>Complete Privacy:</strong> No account required, no tracking, no personal
            data collected. Your story will be anonymous and any metadata will be automatically removed.
          </p>
        </div>
      </div>
    </div>

      {/* Card: story input */ }
  <div
    className="rounded-[12px] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)] border border-[#C65C33]/40"
    style={{
      backgroundImage:
        "linear-gradient(98.51deg, #F7B058 0%, rgba(217,111,50,0.7) 100%)",
        // background: linear-gradient(98.51deg, #F7B058 0%, rgba(217, 111, 50, 0.7) 100%);

    }}
  >
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-[20px] md:text-[22px] font-semibold">Your anonymous story</h2>

      {/* Image (outline) */}
      <div className="flex items-center gap-2">
        {imageName && (
          <span className="text-xs text-darkText/70 max-w-[180px] truncate">{imageName}</span>
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
          className="border border-[#D96F32]text-sm px-3 py-1 rounded flex items-center gap-1 hover:bg-[#D96F32]"
          aria-label="Upload image"
        >
          <img src={LogoIcon} alt="" className="w-4 h-4" aria-hidden="true" />
          Image
        </button>
      </div>
    </div>

    {/* Editor */}
    <div className="bg-background rounded-[10px] p-7">
      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        rows={10}
        className="w-full bg-transparent rounded-md p-0 text-[15px] md:text-[16px] font-serif resize-none outline-none"
        placeholder="share your experience,thoughts or feelings. Take your time dan write as much or as little as feels right for you."
        maxLength={5000}
        aria-label="Your anonymous story"
      />
    </div>

    {/* Bottom bar text */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm text-darkText mt-2">
      <span>{story.length}/5000 characters</span>
      <span>Stories are reviewed before publication</span>
    </div>
  </div>

  {/* Note */ }
  <p className="text-sm text-darkText flex items-center gap-2 mt-3">
    <img src={note} alt="" className="w-4 h-4" />
    Please write at least 10 characters to submit your story
  </p>

  {/* CTA */ }
  <div className="flex justify-center mt-5">
    <button
      type="button"
      disabled={!canSubmit}
      onClick={() => canSubmit && onReviewAndSubmit?.(story)}
      className={`px-6 py-2 rounded-[10px] text-lg text-white font-abhaya
              ${canSubmit ? "bg-[#C65C33] hover:opacity-95" : "bg-[#C65C33]/60 cursor-not-allowed"}`}
    >
      Review &amp; Submit
    </button>
  </div>
    </main >
  );
}
