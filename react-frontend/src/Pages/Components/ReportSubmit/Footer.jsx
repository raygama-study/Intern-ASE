import React from "react";

export default function Footer({ onReadStories, onReturnHome }) {
  return (
    <footer className="mt-8 md:mt-10 font-abhaya">
      {/* kontainer grid ter-center + ada padding samping */}
      <div className="max-w-[900px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kiri: center di mobile, start di desktop */}
        <div className="flex justify-center md:justify-start">
          <button
            type="button"
            onClick={onReadStories}
            className="w-[260px] h-[56px] rounded-[10px] bg-[#C65C33] text-white hover:opacity-95 shadow-[0_8px_22px_rgba(198,92,51,0.28)]"
          >
            Read Other Stories
          </button>
        </div>

        {/* Kanan: center di mobile, end di desktop */}
        <div className="flex justify-center md:justify-end">
          <button
            type="button"
            onClick={onReturnHome}
            className="w-[260px] h-[56px] rounded-[10px] border border-[#C65C33] text-[#C65C33] hover:bg-white/50"
          >
            Return Home
          </button>
        </div>
      </div>
    </footer>
  );
}
