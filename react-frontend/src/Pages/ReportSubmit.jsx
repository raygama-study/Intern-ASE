import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "./Components/ReportSubmit/Header";
import Main from "./Components/ReportSubmit/Main";
import Footer from "./Components/ReportSubmit/Footer";

function useDeletionToken() {
  const { state } = useLocation();
  // pakai token dari state kalau ada; kalau tidak, generate untuk tampilan
  return useMemo(() => {
    if (state?.token) return state.token;
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let t = "";
    for (let i = 0; i < 10; i++) t += chars[Math.floor(Math.random() * chars.length)];
    return t;
  }, [state]);
}

export default function ReportSubmit() {
  const navigate = useNavigate();
  const token = useDeletionToken();

  return (
    <div className="relative bg-background text-darkText overflow-hidden">
      <div className="max-w-[1100px] min-h-screen mx-auto px-4 md:px-8 py-10">
        <Header />
        <Main token={token} />
        <Footer
          onReadStories={() => navigate("/comment")}   // ganti ke route list cerita kamu
          onReturnHome={() => navigate("/")}
        />
      </div>
    </div>
  );
}
