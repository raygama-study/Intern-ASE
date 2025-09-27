import React from "react";
import Header from "./Components/CommentDark/HeaderDark";
import Main from "./Components/CommentDark/MainDark";
import Footer from "./Components/CommentDark/FooterDark";

export default function CommentDark() {
  return (
    <div className="relative min-h-screen bg-[#2B2521] text-[#EEE3D9] overflow-x-clip">
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-8 py-8">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
