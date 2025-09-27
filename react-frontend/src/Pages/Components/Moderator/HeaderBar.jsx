import React from "react";

export default function HeaderBar({ title = "MODERATOR DASHBOARD" }) {
  return (
    <div className="border-b border-[#E6E0DA] sticky top-0 bg-background/80 backdrop-blur z-10">
      <h1 className="font-aboreto text-[22px] md:text-[26px] tracking-wide text-center py-4">
        {title}
      </h1>
    </div>
  );
}
