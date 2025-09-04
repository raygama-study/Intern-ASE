import React from "react";
import Header from "./Components/Comment/Header";
import Main from "./Components/Comment/Main";
import Footer from "./Components/Comment/Footer";

export default function Comment() {
  return (
    <div className="bg-background text-darkText">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-8">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
