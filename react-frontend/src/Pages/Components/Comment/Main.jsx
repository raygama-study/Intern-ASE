import React, { useMemo, useState } from "react";
import FilterTabs from "./FilterTabs";
import Guidelines from "./Guidelines";
import StoryCard from "./StoryCard";
import ContentWarningCard from "./ContentWarningCard";
import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun2.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun4.png";
import Leaf5 from "/src/assets/images/daun5.png";
import Leaf6 from "/src/assets/images/daun6.png";

// contoh data (ganti dengan API nanti)
const SAMPLE = [
  {
    kind: "story",
    text:
      "Today I realized that healing isn’t linear. Some days I feel strong and empowered, and other days I can barely get out of bed. But I’m learning that both states are valid parts of my journey. To anyone reading this who might be struggling - your pace is valid, your feelings are valid, and you’re not alone.",
    age: "1d ago",
    safe: true,
  },
  {
    kind: "cw",
    topics: "Mental health struggles, therapy",
    text:
      "I started therapy and it’s been hard but helpful. Some sessions bring up difficult memories, so I take breaks and ground myself after.",
    age: "5d ago",
    safe: false,
  },
  {
    kind: "cw",
    topics: "Childhood trauma, healing",
    text:
      "I’m slowly learning to set boundaries with family. It isn’t easy, but it’s helping me feel safer and more in control.",
    age: "5d ago",
    safe: false,
  },
  {
    kind: "cw",
    topics: "Grief, loss",
    text:
      "I miss them every day. Some days the grief is heavy; other days I find small moments of light. Both are okay.",
    age: "5d ago",
    safe: false,
  },
];

export default function Main() {
  const [safeOnly, setSafeOnly] = useState(true);

  const stories = useMemo(
    () => (safeOnly ? SAMPLE.filter((s) => s.safe) : SAMPLE),
    [safeOnly]
  );

  // Saat All Stories: tampilkan satu safe story dulu lalu CW, seperti mockup
  const ordered = useMemo(() => {
    if (safeOnly) return stories;
    const normal = stories.filter((s) => s.kind === "story");
    const cw = stories.filter((s) => s.kind === "cw");
    return [...normal, ...cw];
  }, [stories, safeOnly]);

  return (
    <main className="font-abhaya">
      <img src={Leaf1} alt="" aria-hidden="true" className="pointer-events-none select-none absolute z-0 w-[clamp(48px,9vw,104px)] top-[clamp(16px,4vw,30px)] left-[clamp(8px,3vw,20px)] rotate-[1deg]" />
            <img src={Leaf2} alt="" aria-hidden="true" className="pointer-events-none select-none absolute z-0 w-[clamp(56px,12vw,140px)] top-[clamp(120px,22vw,180px)] left-[clamp(6px,2vw,10px)] -rotate-[125deg]" />
            <img src={Leaf3} alt="" aria-hidden="true" className="pointer-events-none select-none absolute z-0 w-[clamp(56px,12vw,140px)] top-[clamp(18px,4vw,30px)] right-[clamp(10px,3.5vw,20px)] rotate-[125deg]" />
            <img src={Leaf4} alt="" aria-hidden="true" className="pointer-events-none select-none absolute z-0 w-[clamp(48px,9vw,104px)] top-[clamp(160px,30vw,240px)] right-[clamp(12px,4vw,25px)] -rotate-[5deg]" />
            <img src={Leaf5} alt="" aria-hidden="true" className="pointer-events-none select-none absolute z-0 w-[clamp(48px,9vw,104px)] top-[clamp(320px,45vw,520px)] left-[clamp(12px,3.5vw,25px)] -rotate-[7deg]" />
            <img src={Leaf6} alt="" aria-hidden="true" className="pointer-events-none select-none absolute z-0 w-[clamp(60px,14vw,155px)] top-[clamp(340px,47vw,540px)] right-[clamp(14px,4vw,35px)] -rotate-[15deg]" />
      
      <FilterTabs safeOnly={safeOnly} onChange={setSafeOnly} />
      <Guidelines />

      {/* daftar stories */}
      <section className="mb-6">
        {ordered.map((s, i) =>
          s.kind === "cw" ? (
            <ContentWarningCard key={i} topics={s.topics} text={s.text} age={s.age} />
          ) : (
            <StoryCard key={i} text={s.text} age={s.age} />
          )
        )}
      </section>

      {/* Load more */}
      <div className="flex justify-center my-6">
        <button
          type="button"
          className="rounded-[10px] border px-6 py-2 hover:bg-white/50"
          style={{ borderColor: "#C65C33", color: "#C65C33" }}
        >
          Load More Stories
        </button>
      </div>

      {/* Review note */}
      <p className="text-center text-sm text-darkText/80">
        All stories are reviewed by trained moderators before publication.
      </p>

      {/* Support */}
      <h2 className="font-aboreto text-center text-[22px] md:text-[26px] mt-10 mb-5 tracking-wide">
        NEED SUPPORT?
      </h2>
      <div className="grid gap-20 md:grid-cols-2">
        <div
          className="rounded-[10px] px-6 py-5"
          style={{ backgroundColor: "#dfcb5ab4", boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.10)" }}
        >
          <p className="font-abhaya font-bold text-center ">Crisis Text Line:</p>
          <p className="font-abhaya text-center ">Text HOME to 741741</p>
        </div>
        <div
          className="rounded-[10px] px-6 py-5"
          style={{ backgroundColor: "#dfcb5ab4", boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.10)" }}
        >
          <p className="font-abhaya font-bold text-center">National Suicide Prevention Lifeline:</p>
          <p className="font-abhaya text-center ">Call or text 988</p>
        </div>
      </div>
    </main>
  );
}
