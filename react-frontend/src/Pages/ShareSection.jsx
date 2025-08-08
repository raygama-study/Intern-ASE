import React from "react";
import Headershare from "./Components/ShareSection/Headershare";
import Main from "./Components/ShareSection/mainshare";

export default function ShareSection() {
  return (
    <div className="relative bg-background text-darkText overflow-hidden">
      <div className="max-w-[1440px] min-h-screen mx-auto px-4 md:px-8">
        <Headershare />
        <Main />
      </div>
    </div>
  );
}
 