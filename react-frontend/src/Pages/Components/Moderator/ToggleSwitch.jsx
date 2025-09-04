import React from "react";

/**
 * ToggleSwitch (RGBA)
 * - Warna ON/OFF dan alpha bisa diubah lewat props.
 * - Default diset sesuai palet kamu.
 */
export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  colorOn = "rgba(34, 32, 32, 1)",      // #C65C33 (solid)
  colorOff = "rgba(217, 212, 206, 0.95)", // netral krem-abu (sedikit transparan)
  thumbColor = "rgba(255, 255, 255, 1)",  // putih solid
  focusRing = "rgba(153, 98, 76, 0.35)",  // ring saat fokus (primary 35%)
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-label={ariaLabel}
      onClick={() => onChange?.(!checked)}
      className="relative inline-flex h-[22px] w-[42px] items-center rounded-full transition outline-none"
      style={{
        backgroundColor: checked ? colorOn : colorOff,
        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      }}
      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${focusRing}`)}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(0,0,0,0)")}
    >
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full shadow transition
          ${checked ? "translate-x-[22px]" : "translate-x-[2px]"}
        `}
        style={{ backgroundColor: thumbColor }}
      />
    </button>
  );
}
