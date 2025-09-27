import React from "react";
import checklist from "/src/assets/images/Vector.png";

export default function MainDark({ token }) {
  return (
    <main className="font-abhaya">
      <div
        className="rounded-[12px] px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10"
        style={{
          background: "linear-gradient(180deg, rgba(128,49,19,0.9) 0%, rgba(217,111,50,0.85) 100%)",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.25)",
        }}
      >
        <div className="relative w-fit mx-auto mb-5 pr-12 md:pr-[67px]">
          <h1 className="font-aboreto text-center leading-tight md:leading-[60px] tracking-wide text-[clamp(26px,4.2vw,40px)] text-white">
            STORY SUBMITTED
          </h1>
          <img
            src={checklist}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute
                       top-1/2 -translate-y-1/2 right-4 md:right-[9.57px]
                       w-[clamp(22px,3.8vw,42px)] h-auto"
          />
        </div>

        <p className="text-center md:text-[19px] mx-auto mb-8 leading-relaxed max-w-[min(90vw,875px)] px-2 text-white/90">
          THANK YOU FOR SHARING YOUR STORY. IT WILL BE REVIEWED BY OUR MODERATION TEAM AND
          PUBLISHED WITHIN 24-48 HOURS IF APPROVED.
        </p>

        <div className="bg-[#2B2521] border border-[#B36B1C]/40 rounded-[10px] px-3 sm:px-5 py-5 sm:py-7 w-full max-w-[900px] mx-auto">
          <p className="text-center mb-3 sm:mb-4 text-white/90">Your Deletion Token:</p>
          <div className="flex justify-center">
            <code className="bg-[#3A322D] text-[#EEE3D9] rounded-md px-3 py-2 tracking-wide inline-block break-all">
              {token}
            </code>
          </div>
          <p className="text-center mt-4 text-white/85">
            Save this token to delete your story later if needed.
          </p>
        </div>
      </div>
    </main>
  );
}
