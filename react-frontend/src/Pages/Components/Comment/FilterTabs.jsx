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
                        ? "bg-brand-700 text-white border border-brand-700 hover:opacity-95 shadow-brand"
                        : "bg-transparent text-brand-700 border border-brand-700 hover:bg-brand-700/10"}`}
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
                        ? "bg-brand-700 text-white border border-brand-700 hover:opacity-95 shadow-brand"
                        : "bg-transparent text-brand-700 border border-brand-700 hover:bg-brand-700/10"}`}
        >
          All Stories
        </button>
      </div>
    </div>
  );
}
