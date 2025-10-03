import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import SoundIcon from "/src/assets/images/sound.png";
import ThemeIcon from "/src/assets/images/moon.png";
import LogoIcon from "/src/assets/images/material-symbols_voice-over-off-rounded.png";
import moderator from "/src/assets/images/moderator.png";

const Header = ({ onOpenLogin, onToggleTheme, isDark }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  function handleTokenSubmit(e) {
    e?.preventDefault();
    const t = token.trim();
    if (!t) return;
    navigate(`/comment?token=${encodeURIComponent(t)}`);
    setToken("");
  }

  return (
    <header className="bg-background text-darkText w-full px-6 py-6 md:py-8">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Left controls */}
        <div className="flex gap-3">
          <button
            className="w-[60px] h-[60px] rounded-[12px] bg-background border border-brand-700/20 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            aria-label="Sound"
            type="button"
          >
            <img src={SoundIcon} alt="" className="w-6 h-6" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="w-[60px] h-[60px] rounded-[12px] bg-background border border-brand-700/20 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
          >
            <img src={ThemeIcon} alt="" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Deletion token search */}
          <form
            onSubmit={handleTokenSubmit}
            className="hidden sm:flex items-center gap-2"
            aria-label="Find my story by deletion token"
          >
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Deletion token…"
              className="h-[42px] w-[210px] md:w-[240px] rounded-[10px] px-3 bg-white text-darkText placeholder-darkText/50
                         border border-brand-700/20 focus:outline-none
                         focus:border-brand-700 focus:shadow-[0_0_0_3px_rgba(198,92,51,0.20)]"
            />
            <button
              type="submit"
              className="h-[42px] px-3 rounded-[10px] bg-brand-700 text-white hover:opacity-95 shadow-brand flex items-center gap-2"
              aria-label="Search by token"
              title="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Find</span>
            </button>
          </form>

          {/* Moderator Login icon button */}
          <button
            type="button"
            onClick={onOpenLogin}
            aria-label="Moderator login"
            className="shrink-0 w-[46px] h-[46px] md:w-[52px] md:h-[52px]
                       rounded-[12px] bg-[#C75D2C]
                       shadow-brand hover:opacity-95 flex items-center justify-center"
          >
            <img
              src={moderator}
              alt="Moderator"
              className="w-5 h-5 md:w-6 md:h-6 select-none pointer-events-none"
            />
          </button>

          {/* Quick Exit */}
          <button
            className="font-abhaya bg-brand-700 text-white px-5 py-2 rounded-[10px]
                       shadow-brand hover:opacity-95"
            type="button"
            onClick={() => navigate("/")}
          >
            Quick Exit
          </button>
        </div>
      </div>

      {/* Logo + Title */}
      <div className="flex justify-center items-center gap-[14px] mb-4">
        <img src={LogoIcon} alt="" className="w-[46px] h-[46px] select-none" aria-hidden="true" />
        <h1 className="font-aboreto text-[48px] md:text-[60px] leading-[1.2] font-normal text-darkText">
          VOICE UNHEARD
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-center font-abhaya text-[16px] md:text-[18px] leading-[1.6] tracking-wide text-darkText/90 px-4">
        A SAFE, ANONYMOUS SPACE TO SHARE YOUR STORY AND FIND CONNECTION THROUGH SHARED EXPERIENCES
      </p>
    </header>
  );
};

export default Header;
