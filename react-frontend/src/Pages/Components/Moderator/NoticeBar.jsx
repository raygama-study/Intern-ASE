import React from "react";

export default function NoticeBar() {
  return (
    <div className="mt-6 border-t border-[#E6E0DA] bg-[#EFE7DD]/40 py-5 px-6 md:px-10">
      <p className="font-abhaya text-center text-[15px]">
        All action are locked for security and compliance. Story must be reviewed within 48 hours
        <span className="mx-1">(Emergency cases : 30 minutes)</span>.
      </p>
    </div>
  );
}
