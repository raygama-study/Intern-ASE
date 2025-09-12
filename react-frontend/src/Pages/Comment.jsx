// src/Pages/Comment.jsx
import React from "react";
import Header from "./Components/Comment/Header";
import Main from "./Components/Comment/Main";
import Footer from "./Components/Comment/Footer";

export default function Comment() {
  return (
    // >>> jadikan root relative + cegah scroll horizontal
    <div className="relative min-h-screen bg-background text-darkText overflow-x-clip">
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-8 py-8">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
