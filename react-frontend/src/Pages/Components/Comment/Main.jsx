import React, { useMemo, useState } from "react";
import FilterTabs from "./FilterTabs";
import Guidelines from "./Guidelines";
import StoryCard from "./StoryCard";
import ContentWarningCard from "./ContentWarningCard";

// leaves
import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun1.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun6.png";

// sample data
const SAMPLE = [
  { kind: "story",
    text:
      "Today I realized that healing isn’t linear. Some days I feel strong and empowered, and other days I can barely get out of bed. But I’m learning that both states are valid parts of my journey. To anyone reading this who might be struggling - your pace is valid, your feelings are valid, and you’re not alone.",
    age: "1d ago", safe: true },
  { kind: "story",
    text:"I celebrated a small victory today - I said 'no' to something that would have drained my energy, and I didn't feel guilty about it. Boundaries are still new to me, but each time I practice them, they get a little easier. Your time and energy are precious. It's okay to protect them.",
    age: "5d ago", safe: true },
  { kind: "cw", topics: "Mental health struggles, therapy",
    text: "I started therapy and it’s been hard but helpful. Some sessions bring up difficult memories, so I take breaks and ground myself after.",
    age: "5d ago", safe: false },
  { kind: "cw", topics: "Childhood trauma, healing",
    text: "I’m slowly learning to set boundaries with family. It isn’t easy, but it’s helping me feel safer and more in control.",
    age: "5d ago", safe: false },
  { kind: "cw", topics: "Grief, loss",
    text: "I miss them every day. Some days the grief is heavy; other days I find small moments of light. Both are okay.",
    age: "5d ago", safe: false },
];

export default function Main() {
  const [safeOnly, setSafeOnly] = useState(true);

  const stories = useMemo(
    () => (safeOnly ? SAMPLE.filter((s) => s.safe) : SAMPLE),
    [safeOnly]
  );

  const ordered = useMemo(() => {
    if (safeOnly) return stories;
    const normal = stories.filter((s) => s.kind === "story");
    const cw = stories.filter((s) => s.kind === "cw");
    return [...normal, ...cw];
  }, [stories, safeOnly]);

  return (
    <main className="relative isolate font-abhaya overflow-visible">
      {/* Leaves layer (behind content) */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none">
        {/* top-left */}
        <img
          src={Leaf1}
          alt=""
          aria-hidden
          draggable="false"
          className="absolute w-[78px] sm:w-[90px] md:w-[130px] -top-[100px] -left-[100px] rotate-[90deg]"
        />
        {/* top-right */}
        <img
          src={Leaf3}
          alt=""
          aria-hidden
          draggable="false"
          className="absolute w-[76px] sm:w-[90px] md:w-[120px] -top-[100px] -right-[80px] -rotate-[50deg]"
        />
        {/* mid-left */}
        <img
          src={Leaf2}
          alt=""
          aria-hidden
          draggable="false"
          className="absolute w-[80px] sm:w-[92px] md:w-[130px] bottom-[130px] -left-[80px] rotate-[50deg]"
        />
        {/* bottom-right */}
        <img
          src={Leaf4}
          alt=""
          aria-hidden
          draggable="false"
          className="absolute w-[82px] sm:w-[96px] md:w-[155px] bottom-[130px] -right-[90px] -rotate-[175deg]"
        />
      </div>

      <FilterTabs safeOnly={safeOnly} onChange={setSafeOnly} />
      <Guidelines />

      {/* list */}
      <section className="mb-6 relative z-10">
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
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="rounded-[10px] px-6 py-5 text-center"
          style={{ backgroundColor: "#F6C88D", boxShadow: "0px 4px 4px 0px #00000040)" }}
          // background: #F6C88D;
          // box-shadow: 0px 4px 4px 0px #00000040;

        >
          <p className="font-abhaya font-bold">Crisis Text Line:</p>
          <p className="font-abhaya">Text HOME to 741741</p>
        </div>
        <div
          className="rounded-[10px] px-6 py-5 text-center"
          style={{ backgroundColor: "#F6C88D", boxShadow: "0px 4px 4px 0px #00000040" }}
        >
          <p className="font-abhaya font-bold">National Suicide Prevention Lifeline:</p>
          <p className="font-abhaya">Call or text 988</p>
        </div>
      </div>
    </main>
  );
}
