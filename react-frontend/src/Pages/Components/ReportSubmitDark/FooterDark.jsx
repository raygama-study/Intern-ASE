import React from "react";

export default function FooterDark({ onReadStories, onReturnHome }) {
  return (
    <footer className="mt-8 md:mt-10 font-abhaya">
      <div className="max-w-[900px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center md:justify-start">
          <button
            type="button"
            onClick={onReadStories}
            className="w-[260px] h-[56px] rounded-[10px] bg-[#C65C33] text-white hover:opacity-95 shadow-[0_8px_22px_rgba(198,92,51,0.45)]"
          >
            Read Other Stories
          </button>
        </div>

        <div className="flex justify-center md:justify-end">
          <button
            type="button"
            onClick={onReturnHome}
            className="w-[260px] h-[56px] rounded-[10px] border border-[#C65C33] text-[#C65C33] hover:bg-white/10"
          >
            Return Home
          </button>
        </div>
      </div>
    </footer>
  );
}
