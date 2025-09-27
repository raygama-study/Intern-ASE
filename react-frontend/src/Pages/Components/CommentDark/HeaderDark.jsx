import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function HeaderDark() {
  const navigate = useNavigate();

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/dark")}
          className="flex items-center gap-2 text-[#EEE3D9] font-bold text-sm hover:opacity-90"
        >
          <ArrowLeft size={20} />
          Back to home
        </button>

        <button
          type="button"
          onClick={() => navigate("/dark")}
          className="bg-[#C65C33] text-white text-sm font-abhaya px-4 py-1.5 rounded-[6px] hover:opacity-95 shadow-[0_8px_22px_rgba(198,92,51,0.35)]"
        >
          Quick Exit
        </button>
      </div>

      <div className="mt-6 text-center">
        <h1 className="font-aboreto text-[36px] md:text-[44px] leading-tight tracking-wide">
          STORIES FROM OUR COMMUNITY
        </h1>
        <p className="font-abhaya text-[15px] md:text-[16px] mt-3 tracking-wide text-white/80">
          ANONYMOUS VOICES SHARING EXPERIENCES OF HEALING, GROWTH, AND RESILIENCE
        </p>
      </div>
    </header>
  );
}
