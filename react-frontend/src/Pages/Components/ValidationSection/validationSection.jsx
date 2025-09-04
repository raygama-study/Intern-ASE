import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import attention from "/src/assets/images/material-symbols_warning-outline-rounded.png";

export default function ValidationSection({ open, onClose, onConfirm, showClose = false }) {
  const dialogRef = useRef(null);

  const items = [
    "I understand this is a public platform and my story may be read by others.",
    "I understand my story will be completely anonymous and I cannot be identified.",
    "I understand stories are reviewed by trained moderators before publication.",
    "I am not in immediate danger and understand this platform is not a crisis service.",
  ];

  const [checked, setChecked] = useState(items.map(() => false));
  const allChecked = checked.every(Boolean);

  // reset + focus + lock scroll
  useEffect(() => {
    if (open) {
      setChecked(items.map(() => false));
      setTimeout(() => dialogRef.current?.focus(), 0);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  // esc to close
  useEffect(() => {
    const onKey = (e) => open && e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggle = (i) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      onClick={onClose}
    >
      {/* wrapper scroll + top padding */}
      <div className="h-full w-full overflow-y-auto">
        <div
          className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-6 sm:pt-12 pb-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="rounded-[14px] bg-background p-6 sm:p-8 shadow-xl outline-none"
          >
            {/* Header */}
            <div className="mb-[32px] flex items-start justify-between">
              {/* 614×60, gap 23 */}
              <div className="flex items-center gap-[23px] w-[614px] h-[60px]">
                <img src={attention} alt="" aria-hidden="true" className="w-7 h-7 select-none" />
                <h2
                  id="consent-title"
                  className="font-aboreto text-[32px] md:text-[36px] leading-tight text-darkText"
                >
                  Consent & Understanding
                </h2>
              </div>
              {showClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-2 text-darkText/70 hover:bg-white/50"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Description (max 906 × ~66) */}
            <p className="font-abhaya text-base text-darkText/90 max-w-[906px] mb-6">
              Before sharing your story, please confirm your understanding of how this platform works:
            </p>

            {/* Checklist (994 × 250) */}
            <ul className="w-full sm:w-[994px] min-h-[250px] space-y-5 mb-8">
              {items.map((text, i) => (
                <li key={i}>
                  <label htmlFor={`consent-${i}`} className="flex items-start gap-4 cursor-pointer">
                    {/* circular checkbox */}
                    <span className="mt-1 grid h-7 w-7 place-content-center rounded-full border-2 border-[#C65C33]">
                      <input
                        id={`consent-${i}`}
                        type="checkbox"
                        checked={checked[i]}
                        onChange={() => toggle(i)}
                        className="peer sr-only"
                      />
                      <span className="h-4 w-4 rounded-full bg-[#C65C33] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-darkText text-[17px] leading-[1.6] font-abhaya">{text}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* Crisis box (1035 total width incl. padding) */}
            <div
              className="w-full max-w-[1035px] box-border mx-auto min-h-[140px] rounded-[10px]
                         px-[50px] py-[40px] mb-8"
              style={{
                backgroundColor: "#ebab3477",               // oranye palet
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              <div className="flex h-full w-full items-start gap-4">
                <img src={attention} alt="" aria-hidden="true" className="w-6 h-6 mt-1 select-none" />
                <p className="font-abhaya text-[14px] md:text-[15px] text-darkText">
                  <span className="font-semibold">Crisis Support:</span> If you're in immediate danger, please contact
                  emergency services or a crisis helpline immediately. This platform is for sharing experiences, not
                  emergency support.
                </p>
              </div>
            </div>

            {/* Actions: SUBMIT kiri (filled), CANCEL kanan (outline) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Submit (filled, 297 × 63, p:16/20) */}
              <button
                type="button"
                onClick={() => allChecked && onConfirm?.()}
                disabled={!allChecked}
                className={`w-[297px] h-[63px] rounded-[10px] px-[20px] py-[16px] text-white font-abhaya
                  ${allChecked ? "bg-[#C65C33] hover:opacity-95" : "bg-[#C65C33]/60 cursor-not-allowed"}`}
              >
                Submit My Stories
              </button>

              {/* Cancel (outline, 301 × 67, p:18/36) */}
              <button
                type="button"
                onClick={onClose}
                className="w-[301px] h-[67px] rounded-[10px] border border-[#C65C33]
                           px-[36px] py-[18px] text-[#C65C33] font-abhaya hover:bg-white/50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ValidationSection.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  showClose: PropTypes.bool,
};
