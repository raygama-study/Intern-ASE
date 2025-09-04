// src/Pages/ValidationSection.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ValidationSection() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const story = state?.story ?? ""; // opsional: bawa teks dari ShareSection

  const items = [
    "I understand this is a public platform and my story may be read by others.",
    "I understand my story will be completely anonymous and I cannot be identified.",
    "I understand stories are reviewed by trained moderators before publication.",
    "I am not in immediate danger and understand this platform is not a crisis service.",
  ];

  const [checked, setChecked] = useState(items.map(() => false));
  const allChecked = checked.every(Boolean);

  const toggle = (i) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  function handleCancel() {
    navigate("/share");
  }
  function handleConfirm() {
    // lanjut submit atau ke halaman berikutnya
    navigate("/report-submit", { state: { story } });
  }

  return (
    <div className="min-h-screen bg-background text-darkText px-4 md:px-8 py-8 font-abhaya flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="font-aboreto text-2xl md:text-3xl mb-4">
          Consent & Understanding
        </h1>

        <p className="text-sm md:text-base mb-6">
          Before sharing your story, please confirm your understanding of how
          this platform works:
        </p>

        <ul className="space-y-4 mb-8">
          {items.map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <input
                id={`consent-${i}`}
                type="checkbox"
                className="mt-1 h-5 w-5 rounded-full border-2 border-primary accent-primary"
                checked={checked[i]}
                onChange={() => toggle(i)}
              />
              <label htmlFor={`consent-${i}`} className="text-sm md:text-base">
                {text}
              </label>
            </li>
          ))}
        </ul>

        <div
          className="bg-completeprivacy rounded-lg p-4 mb-8"
          style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-primary text-lg" aria-hidden="true">
              ▲
            </span>
            <p className="text-sm md:text-base">
              <strong>Crisis Support:</strong> If you're in immediate danger,
              please contact emergency services or a crisis helpline
              immediately. This platform is for sharing experiences, not
              emergency support.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="sm:order-2 rounded-xl border border-primary px-6 py-2 text-primary hover:bg-white/50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!allChecked}
            className={`rounded-xl px-6 py-2 text-white ${
              allChecked
                ? "bg-primary hover:opacity-95"
                : "bg-primary/60 cursor-not-allowed"
            }`}
          >
            Submit My Stories
          </button>
        </div>
      </div>
    </div>
  );
}
