import React from "react";
import checklist from "/src/assets/images/Vector.png"; // pastikan file & kapitalisasi benar

export default function Main({ token }) {
  return (
    <main className="font-abhaya">
      <div
        className="rounded-[12px] shadow-lg px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10"
        style={{
          // gradient palet: atas → bawah (pakai 8-digit hex dari kamu)
          backgroundImage: "linear-gradient(180deg, #fddb7fff 0%, #df7f47ff 100%)",
          boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.15)",
        }}
      >
        {/* Judul + ikon cek — aman di semua lebar */}
        <div className="relative w-fit mx-auto mb-5 pr-12 md:pr-[67px]">
          <h1
            className="font-aboreto text-center leading-tight md:leading-[60px] tracking-wide
                       text-[clamp(26px,4.2vw,40px)]"
          >
            STORY SUBMITTED
          </h1>

          {/* Ikon di kanan judul, center vertikal */}
          <img
            src={checklist}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute
                       top-1/2 -translate-y-1/2 right-4 md:right-[9.57px]
                       w-[clamp(22px,3.8vw,41.8851px)] h-auto"
          />
        </div>

        {/* Deskripsi */}
        <p className="text-center mx-auto mb-8 leading-relaxed max-w-[min(90vw,900px)] px-2">
          THANK YOU FOR SHARING YOUR STORY. IT WILL BE REVIEWED BY OUR MODERATION TEAM AND
          PUBLISHED WITHIN 24-48 HOURS IF APPROVED.
        </p>

        {/* Token box */}
        <div className="bg-background rounded-[10px] px-3 sm:px-5 py-5 sm:py-7 w-full max-w-[900px] mx-auto">
          <p className="text-center mb-3 sm:mb-4">Your Deletion Token:</p>
          <div className="flex justify-center">
            <code className="bg-[#E6E0DA] text-darkText rounded-md px-3 py-2 tracking-wide inline-block break-all">
              {token}
            </code>
          </div>
          <p className="text-center mt-4">
            Save this token to delete your story later if needed.
          </p>
        </div>
      </div>
    </main>
  );
}
