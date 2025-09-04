import React from "react";
import SoundIcon from "/src/assets/images/sound.png";
import ThemeIcon from "/src/assets/images/moon.png";
import LogoIcon from "/src/assets/images/material-symbols_voice-over-off-rounded.png";
import moderator from "/src/assets/images/moderator.png";

const Header = ({ onOpenLogin }) => {
  return (
    <header className="bg-background text-darkText w-full px-6 py-6 md:py-8">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        {/* Left controls */}
        <div className="flex gap-3">
          <button
            className="w-[60px] h-[60px] rounded-[12px] bg-background border border-[#C65C33]/20 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            aria-label="Sound"
            type="button"
          >
            <img src={SoundIcon} alt="" className="w-6 h-6" />
          </button>
          <button
            className="w-[60px] h-[60px] rounded-[12px] bg-background border border-[#C65C33]/20 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            aria-label="Theme"
            type="button"
          >
            <img src={ThemeIcon} alt="" className="w-6 h-6" />
          </button>
        </div>

        {/* Right controls: Moderator + Quick Exit */}
        <div className="flex items-center gap-4">
          {/* Moderator Login icon button */}
          <button
            type="button"
            onClick={onOpenLogin}
            aria-label="Moderator login"
            className="shrink-0 w-[46px] h-[46px] md:w-[52px] md:h-[52px]
                       rounded-[12px] bg-[#C65C33]
                       shadow-[0_10px_22px_rgba(198,92,51,0.28)]
                       hover:opacity-95 flex items-center justify-center"
          >
            <img
              src={moderator}
              alt="Moderator"
              className="w-5 h-5 md:w-6 md:h-6 select-none pointer-events-none"
            />
          </button>

          {/* Quick Exit */}
          <button
            className="font-abhaya bg-[#C65C33] text-white px-5 py-2 rounded-[10px]
                       shadow-[0_8px_22px_rgba(198,92,51,0.28)] hover:opacity-95"
            type="button"
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
