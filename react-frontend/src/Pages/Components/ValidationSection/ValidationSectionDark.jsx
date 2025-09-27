// src/Pages/Components/ValidationSection/ValidationSectionDark.jsx
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import attention from "/src/assets/images/material-symbols_warning-outline-rounded.png";

export default function ValidationSectionDark({ open, onClose, onConfirm, showClose = false }) {
  const dialogRef = useRef(null);

  const items = [
    "I understand this is a public platform and my story may be read by others.",
    "I understand my story will be completely anonymous and I cannot be identified.",
    "I understand stories are reviewed by trained moderators before publication.",
    "I am not in immediate danger and understand this platform is not a crisis service.",
  ];

  const [checked, setChecked] = useState(items.map(() => false));
  const allChecked = checked.every(Boolean);

  useEffect(() => {
    if (open) {
      setChecked(items.map(() => false));
      setTimeout(() => dialogRef.current?.focus(), 0);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => open && e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggle = (i) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title-dark"
      onClick={onClose}
    >
      <div className="h-full w-full overflow-y-auto">
        <div
          className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-6 sm:pt-12 pb-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="rounded-[14px] bg-[#2B2521] p-6 sm:p-8 shadow-xl outline-none text-[#EEE3D9]"
          >
            {/* Header */}
            <div className="mb-[32px] flex items-start justify-between">
              <div className="flex items-center gap-[23px]">
                <img src={attention} alt="" aria-hidden="true" className="w-10 h-10 select-none" />
                <h2
                  id="consent-title-dark"
                  className="font-aboreto text-[32px] md:text-[36px] leading-tight text-white"
                >
                  Consent & Understanding
                </h2>
              </div>
              {showClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-2 text-white/70 hover:bg-white/10"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Description */}
            <p className="font-abhaya text-base text-white/85 max-w-[906px] mb-6">
              Before sharing your story, please confirm your understanding of how this platform works:
            </p>

            {/* Checklist */}
            <ul className="w-full sm:w-[994px] min-h-[250px] space-y-5 mb-8">
              {items.map((text, i) => (
                <li key={i}>
                  <label htmlFor={`consent-dark-${i}`} className="flex items-start gap-4 cursor-pointer">
                    <span className="mt-1 grid h-7 w-7 place-content-center rounded-full border-2 border-[#C65C33]">
                      <input
                        id={`consent-dark-${i}`}
                        type="checkbox"
                        checked={checked[i]}
                        onChange={() => toggle(i)}
                        className="peer sr-only"
                      />
                      <span className="h-4 w-4 rounded-full bg-[#C65C33] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[#EEE3D9] text-[17px] leading-[1.6] font-abhaya">{text}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* Crisis box */}
            <div
              className="w-full max-w-[1035px] mx-auto min-h-[100px] rounded-[10px] px-[40px] py-[32px] mb-7"
              style={{
                backgroundColor: "#80311399",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.40)",
              }}
            >
              <div className="flex items-start gap-4">
                <img src={attention} alt="" aria-hidden="true" className="w-10 h-10 select-none" />
                <p className="font-abhaya text-[14px] md:text-[16px] text-[#EEE3D9]">
                  <span className="font-semibold">Crisis Support:</span> If you're in immediate danger, please contact
                  emergency services or a crisis helpline immediately. This platform is not for emergency support.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-[301px] h-[67px] rounded-[10px] border border-[#C65C33]
                           px-[36px] py-[18px] text-[#C65C33] font-abhaya hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => allChecked && onConfirm?.()}
                disabled={!allChecked}
                className={`w-[297px] h-[63px] rounded-[10px] px-[20px] py-[16px] text-white font-abhaya
                  ${allChecked ? "bg-[#C65C33] hover:opacity-95" : "bg-[#C65C33]/60 cursor-not-allowed"}`}
              >
                Submit My Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ValidationSectionDark.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  showClose: PropTypes.bool,
};
