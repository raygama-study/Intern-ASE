import React from "react";
export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  colorOn = "rgba(34, 32, 32, 1)",    
  colorOff = "rgba(217, 212, 206, 0.95)", 
  thumbColor = "rgba(255, 255, 255, 1)",  
  focusRing = "rgba(153, 98, 76, 0.35)",  // 
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
