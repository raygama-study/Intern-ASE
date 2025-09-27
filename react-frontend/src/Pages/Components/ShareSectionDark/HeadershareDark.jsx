import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HeadershareDark = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#2B2521] pt-3 md:pt-4 pb-3 md:pb-4 px-4 md:px-12 text-[#EEE3D9]">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <button
          type="button"
          onClick={() => navigate("/dark")}
          className="flex items-center gap-2 text-[#EEE3D9] font-bold text-sm"
        >
          <ArrowLeft size={20} />
          Back to home
        </button>

        <button
          type="button"
          onClick={() => navigate("/dark")}
          className="bg-[#C65C33] text-white text-sm font-abhaya px-4 py-1.5 rounded-[6px] hover:opacity-95"
        >
          Quick Exit
        </button>
      </div>

      <div className="text-center px-2 -mt-1 md:-mt-2">
        <h1 className="font-aboreto text-[40px] md:text-[52px] leading-[1.1] mb-9 text-white">
          SHARE YOUR STORY
        </h1>
        <p className="font-abhaya text-[16px] md:text-[18px] leading-snug text-white/80">
          YOUR VOICE MATTERS. SHARE YOUR EXPERIENCE ANONYMOUSLY
          <br />
          IN A SAFE, SUPPORTIVE SPACE.
        </p>
      </div>
    </header>
  );
};

export default HeadershareDark;
