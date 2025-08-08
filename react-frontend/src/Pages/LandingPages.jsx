import React from "react";
import Header from "./Components/LandingPages/Header";
import Main from "./Components/LandingPages/main";
import Footer from "./Components/LandingPages/Footer";

export default function LandingPages() {
  return (
    <div className="relative bg-background text-darkText overflow-hidden">
      <div className="max-w-[1440px] min-h-screen mx-auto px-4 md:px-8">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
