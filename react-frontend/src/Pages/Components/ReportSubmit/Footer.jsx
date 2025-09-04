import React from "react";

export default function Footer({ onReadStories, onReturnHome }) {
  return (
    <footer className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 font-abhaya">
      {/* Read Other Stories — filled primary */}
      <button
        type="button"
        onClick={onReadStories}
        className="w-full md:w-[260px] h-[52px] md:h-[56px] rounded-[10px]
                   bg-[#C65C33] text-white hover:opacity-95
                   justify-self-stretch md:justify-self-start"
      >
        Read Other Stories
      </button>

      {/* Return Home — outline primary */}
      <button
        type="button"
        onClick={onReturnHome}
        className="w-full md:w-[260px] h-[52px] md:h-[56px] rounded-[10px]
                   border border-[#C65C33] text-[#C65C33] hover:bg-white/50
                   justify-self-stretch md:justify-self-end"
      >
        Return Home
      </button>
    </footer>
  );
}
