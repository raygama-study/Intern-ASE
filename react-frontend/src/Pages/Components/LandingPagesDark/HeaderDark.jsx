// src/Pages/Components/LandingPagesDark/HeaderDark.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import SoundIcon from "/src/assets/images/sound-dark.png";
import ThemeIcon from "/src/assets/images/material-symbols_dark-mode-outline-rounded-dark.png";
import LogoIcon from "/src/assets/images/material-symbols_voice-over-off-rounded.png";
import moderator from "/src/assets/images/moderator.png";

const HeaderDark = ({ onOpenLogin, onToggleTheme, onQuickExit }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  function handleTokenSubmit(e) {
    e?.preventDefault();
    const t = token.trim();
    if (!t) return;
    navigate(`/dark/comment?token=${encodeURIComponent(t)}`);
    setToken("");
  }

  return (
    <header className="w-full px-6 py-6 md:py-8 bg-[#2B2521] text-[#EEE3D9]">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Left */}
        <div className="flex gap-3">
          <button
            className="w-[60px] h-[60px] rounded-[12px] bg-[#2B2521] border border-[#B36B1C]/40 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            aria-label="Sound"
            type="button"
          >
            <img src={SoundIcon} alt="" className="w-6 h-6 opacity-90" />
          </button>

          <button
            onClick={onToggleTheme}
            className="w-[60px] h-[60px] rounded-[12px] bg-[#2B2521] border border-[#B36B1C]/40 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            aria-label="Switch to light mode"
            type="button"
            title="Toggle theme"
          >
            <img src={ThemeIcon} alt="" className="w-6 h-6 opacity-90" />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Deletion token search (baru) */}
          <form
            onSubmit={handleTokenSubmit}
            className="hidden sm:flex items-center gap-2"
            aria-label="Find my story by deletion token"
          >
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Deletion token…"
              className="h-[42px] w-[210px] md:w-[240px] rounded-[10px] px-3 bg-[#2B2521] text-[#EEE3D9]
                         placeholder-white/50 border border-[#B36B1C]/40 focus:outline-none
                         focus:border-[#C65C33] focus:shadow-[0_0_0_3px_rgba(198,92,51,0.25)]"
            />
            <button
              type="submit"
              className="h-[42px] px-3 rounded-[10px] bg-[#C65C33] text-white hover:opacity-95
                         shadow-[0_8px_22px_rgba(198,92,51,0.35)] flex items-center gap-2"
              aria-label="Search by token"
              title="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Find</span>
            </button>
          </form>

          <button
            type="button"
            onClick={onOpenLogin}
            aria-label="Moderator login"
            className="shrink-0 w-[46px] h-[46px] md:w-[52px] md:h-[52px]
                       rounded-[12px] bg-[#C65C33]
                       shadow-[0_10px_22px_rgba(198,92,51,0.35)]
                       hover:opacity-95 flex items-center justify-center"
          >
            <img
              src={moderator}
              alt="Moderator"
              className="w-5 h-5 md:w-6 md:h-6 select-none pointer-events-none"
            />
          </button>

          <button
            type="button"
            onClick={onQuickExit}
            className="font-abhaya bg-[#C65C33] text-white px-5 py-2 rounded-[10px]
                       shadow-[0_8px_22px_rgba(198,92,51,0.35)] hover:opacity-95"
          >
            Quick Exit
          </button>
        </div>
      </div>

      {/* Logo + Title */}
      <div className="flex justify-center items-center gap-[14px] mb-4">
        <img src={LogoIcon} alt="" className="w-[46px] h-[46px] select-none" aria-hidden="true" />
        <h1 className="font-aboreto text-[48px] md:text-[60px] leading-[1.2] font-normal text-white">
          VOICE UNHEARD
        </h1>
      </div>

      <p className="text-center font-abhaya text-[16px] md:text-[18px] leading-[1.6] tracking-wide text-white/70 px-4">
        A SAFE, ANONYMOUS SPACE TO SHARE YOUR STORY AND FIND CONNECTION THROUGH SHARED EXPERIENCES
      </p>
    </header>
  );
};

export default HeaderDark;
