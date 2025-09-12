// FilterTabs (compact)
export default function FilterTabs({ safeOnly, onChange }) {
  return (
    <div className="mt-3 mb-6">
      <div className="mx-auto w-full max-w-[400px] grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        <button
          type="button"
          aria-pressed={safeOnly}
          onClick={() => onChange(true)}
          className={`h-[32px] px-4 rounded-[8px] font-abhaya text-[13px] leading-none
                      justify-self-center sm:justify-self-start transition
                      ${safeOnly
                        ? "bg-[#C65C33] text-white border border-[#C65C33] hover:opacity-95"
                        : "bg-transparent text-[#C65C33] border border-[#C65C33] hover:bg-[#C65C33]/10"}`}
        >
          Safe Content Only
        </button>

        <button
          type="button"
          aria-pressed={!safeOnly}
          onClick={() => onChange(false)}
          className={`h-[32px] px-4 rounded-[8px] font-abhaya text-[13px] leading-none
                      justify-self-center sm:justify-self-end transition
                      ${!safeOnly
                        ? "bg-[#C65C33] text-white border border-[#C65C33] hover:opacity-95"
                        : "bg-transparent text-[#C65C33] border border-[#C65C33] hover:bg-[#C65C33]/10"}`}
        >
          All Stories
        </button>
      </div>
    </div>
  );
}
