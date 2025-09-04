// src/Pages/ShareSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headershare from "./Components/ShareSection/Headershare";
import Main from "./Components/ShareSection/mainshare";
import ValidationSection from "./Components/ValidationSection/validationSection";


export default function ShareSection() {
  const navigate = useNavigate();
  const [openConsent, setOpenConsent] = useState(false);
  const [draftStory, setDraftStory] = useState("");

  function handleReviewAndSubmit(text) {
    setDraftStory(text);
    setOpenConsent(true);
  }

  function handleConfirm() {
    setOpenConsent(false);
    // kalau mau kirim token/state, taruh di argumen kedua:
    // navigate("/report-submit", { state: { token: someToken } });
    navigate("/report-submit");
  }

  return (
    <div className="relative bg-background text-darkText overflow-hidden">
      <div className="max-w-[1100px] min-h-screen mx-auto px-4 md:px-8 py-8">
        <Headershare />
        <Main onReviewAndSubmit={handleReviewAndSubmit} />
      </div>

      <ValidationSection
        open={openConsent}
        onClose={() => setOpenConsent(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
