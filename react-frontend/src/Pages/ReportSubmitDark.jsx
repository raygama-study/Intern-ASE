import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "./Components/ReportSubmitDark/HeaderDark";
import Main from "./Components/ReportSubmitDark/MainDark";
import Footer from "./Components/ReportSubmitDark/FooterDark";

function useDeletionToken() {
  const { state } = useLocation();
  return useMemo(() => {
    if (state?.token) return state.token;
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let t = "";
    for (let i = 0; i < 10; i++) t += chars[Math.floor(Math.random() * chars.length)];
    return t;
  }, [state]);
}

export default function ReportSubmitDark() {
  const navigate = useNavigate();
  const token = useDeletionToken();

  return (
    <div className="relative bg-[#2B2521] text-[#EEE3D9] overflow-hidden">
      <div className="max-w-[1100px] min-h-screen mx-auto px-4 md:px-8 py-10">
        <Header />
        <Main token={token} />
        <Footer
          onReadStories={() => navigate("/dark/comment")}
          onReturnHome={() => navigate("/dark")}
        />
      </div>
    </div>
  );
}
