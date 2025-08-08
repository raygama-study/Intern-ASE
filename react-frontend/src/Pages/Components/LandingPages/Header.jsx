import React from "react";
import SoundIcon from "/src/assets/images/sound.png";
import ThemeIcon from "/src/assets/images/moon.png";
import LogoIcon from "/src/assets/images/material-symbols_voice-over-off-rounded.png";

const Header = () => {
  return (
    <header className="bg-background text-darkText w-full px-6 py-6 md:py-8">
      {/* Baris atas: tombol kiri + tombol kanan */}
      <div className="flex justify-between items-center mb-6">
        {/* Icon kiri */}
        <div className="flex gap-3">
          <button className="w-[60px] h-[60px] border border-gray-300 bg-background rounded-md flex items-center justify-center">
            <img src={SoundIcon} alt="Sound" className="w-6 h-6" />
          </button>
          <button className="w-[60px] h-[60px] border border-gray-300 bg-background rounded-md flex items-center justify-center">
            <img src={ThemeIcon} alt="Theme" className="w-6 h-6" />
          </button>
        </div>

        {/* Tombol Quick Exit */}
        <div>
          <button className=" font-abhaya bg-primary text-white px-4 py-2 rounded-md shadow-md">
            Quick Exit
          </button>
        </div>
      </div>

      {/* Logo + Judul */}
      <div className="flex justify-center items-center gap-[17px] mb-4">
        <img src={LogoIcon} alt="Voice Icon" className="w-[60px] h-[60px]" />
        <h1 className="font-aboreto text-[60px] leading-[70px] font-normal text-black">
          VOICE UNHEARD
        </h1>
      </div>

      {/* Deskripsi */}
      <div className="text-center px-4">
        <p className="font-aboreto text-[24px] leading-[100%] font-[400] font-Aboreto uppercase">
          A SAFE, ANONYMOUS SPACE TO SHARE YOUR STORY AND FIND CONNECTION THROUGH SHARED EXPERIENCES
        </p>
      </div>
    </header>
  );
};

export default Header;
