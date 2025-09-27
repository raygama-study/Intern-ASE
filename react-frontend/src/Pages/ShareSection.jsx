import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Headershare from "./Components/ShareSection/Headershare";
import MainShare from "./Components/ShareSection/mainshare";
import ValidationSection from "./Components/ValidationSection/validationSection";
import { BACKEND_URL } from "../config";

export default function ShareSection() {
  const navigate = useNavigate();

  const [openConsent, setOpenConsent] = useState(false);
  const [storyText, setStoryText] = useState("");
  const [images, setImages] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  function handleReviewAndSubmit(text, pickedFiles = [], pickedCats = []) {
    setStoryText(text);
    setImages(pickedFiles);
    setCategoryIds(pickedCats);
    setOpenConsent(true);
  }

  async function submitToBackend() {
    const fd = new FormData();
    fd.append("content", storyText);
    (categoryIds || []).forEach((id) => fd.append("categoryIds", id));
    (images || []).forEach((f) => fd.append("images", f));

    const res = await fetch(`${BACKEND_URL}/stories`, { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.payload?.message || "Failed to submit story");

    const data = json?.payload?.datas;
    const token = data?.deletion_token || "";
    navigate("/report-submit", { state: { token } });
  }

  return (
    <div className="relative bg-background text-darkText overflow-hidden min-h-screen">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-6">
        <Headershare />
        <MainShare onReviewAndSubmit={handleReviewAndSubmit} />
      </div>

      <ValidationSection
        open={openConsent}
        onClose={() => setOpenConsent(false)}
        onConfirm={async () => {
          try { await submitToBackend(); } catch (e) { alert(e.message); }
          setOpenConsent(false);
        }}
      />
    </div>
  );
}
