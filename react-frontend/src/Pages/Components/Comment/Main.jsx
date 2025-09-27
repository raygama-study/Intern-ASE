// src/Pages/Components/Comment/Main.jsx
import React, { useEffect, useMemo, useState } from "react";
import FilterTabs from "./FilterTabs";
import Guidelines from "./Guidelines";
import StoryCard from "./StoryCard";

import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun1.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun6.png";

// perbaikan path relatif
import { fetchPostedStories, fetchCommentsByStory, createComment } from "../../../utils/api";
import { fromNow } from "../../../utils/time";

export default function Main() {
  const [safeOnly, setSafeOnly] = useState(true);
  const [stories, setStories] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const list = await fetchPostedStories();
        const normalized = Array.isArray(list) ? list : [];
        setStories(normalized);

        const map = {};
        for (const s of normalized) {
          try {
            map[s.id] = await fetchCommentsByStory(s.id);
          } catch {
            map[s.id] = [];
          }
        }
        setCommentsMap(map);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const ordered = useMemo(() => stories, [stories]);

  async function handleSubmitComment(storyId, text) {
    if (!text?.trim()) return;
    try {
      const c = await createComment(storyId, text.trim());
      setCommentsMap((prev) => ({
        ...prev,
        [storyId]: [c, ...(prev[storyId] || [])],
      }));
    } catch (err) {
      alert(err.message || "Failed to post comment");
    }
  }

  return (
    <main className="relative isolate font-abhaya overflow-visible">
      <div className="pointer-events-none absolute inset-0 -z-10 select-none">
        <img src={Leaf1} alt="" aria-hidden draggable="false" className="absolute w-[78px] sm:w-[90px] md:w-[130px] -top-[100px] -left-[100px] rotate-[90deg]" />
        <img src={Leaf3} alt="" aria-hidden draggable="false" className="absolute w-[76px] sm:w-[90px] md:w-[120px] -top-[100px] -right-[80px] -rotate-[50deg]" />
        <img src={Leaf2} alt="" aria-hidden draggable="false" className="absolute w-[80px] sm:w-[92px] md:w-[130px] bottom-[130px] -left-[80px] rotate-[50deg]" />
        <img src={Leaf4} alt="" aria-hidden draggable="false" className="absolute w-[82px] sm:w-[96px] md:w-[155px] bottom-[130px] -right-[90px] -rotate-[175deg]" />
      </div>

      <FilterTabs safeOnly={safeOnly} onChange={setSafeOnly} />
      <Guidelines />

      <section className="mb-6 relative z-10">
        {loading && <p className="text-center">Loading…</p>}

        {!loading &&
          ordered.map((s) => {
            const age = s.created_at ? fromNow(s.created_at) : "";
            const comments = commentsMap[s.id] || [];
            return (
              <StoryCard
                key={s.id}
                text={s.content}
                age={age}
                comments={comments}
                onSubmitComment={(val) => handleSubmitComment(s.id, val)}
              />
            );
          })}
      </section>

      <div className="flex justify-center my-6">
        <button
          type="button"
          className="rounded-[10px] border px-6 py-2 hover:bg-white/50"
          style={{ borderColor: "#C65C33", color: "#C65C33" }}
          onClick={() => window.location.reload()}
        >
          Reload Stories
        </button>
      </div>

            <p className="text-center text-sm text-darkText/80">
        All stories are reviewed by trained moderators before publication.
      </p>

      <h2 className="font-aboreto text-center text-[22px] md:text-[26px] mt-10 mb-5 tracking-wide">
        NEED SUPPORT?
      </h2>

      {/* 2-column support cards, pushed to sides */}
<div className="mx-auto w-full max-w-[1160px] flex flex-col sm:flex-row sm:justify-between items-start gap-4">
  <div
    className="w-full sm:w-[230px] md:w-[250px] rounded-[12px] px-4 py-3 text-center text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
    style={{ background: "#D96F32" }}
  >
    <p className="font-abhaya font-bold leading-tight text-[13px] md:text-[14px]">
      Crisis Text Line
    </p>
    <p className="font-abhaya text-[12px] md:text-[13px]">Text HOME to 741741</p>
  </div>

  <div
    className="w-full sm:w-[230px] md:w-[250px] rounded-[12px] px-4 py-3 text-center text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
    style={{ background: "#D96F32" }}
  >
    <p className="font-abhaya font-bold leading-tight text-[13px] md:text-[14px]">
      National Suicide Prevention Lifeline
    </p>
    <p className="font-abhaya text-[12px] md:text-[13px]">Call or text 988</p>
  </div>
</div>

    </main>
  );
}
