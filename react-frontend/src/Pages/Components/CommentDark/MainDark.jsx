// src/Pages/Components/CommentDark/MainDark.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterTabsDark from "./FilterTabsDark";
import GuidelinesDark from "./GuidelinesDark";
import StoryCardDark from "./StoryCardDark";
import ContentWarningCardDark from "./ContentWarningCardDark";

import Leaf1 from "/src/assets/images/daun1.png";
import Leaf2 from "/src/assets/images/daun1.png";
import Leaf3 from "/src/assets/images/daun3.png";
import Leaf4 from "/src/assets/images/daun6.png";

import {
  fetchPostedStories,
  fetchCommentsByStory,
  createComment,
  flagPostedStory,
} from "../../../utils/api";
import { fromNow } from "../../../utils/time";
import TokenDeletionBannerDark from "../CommentDark/TokenDeletionBannerDark";
import { isUnsafeText } from "../../../utils/moderation"; // ⬅️ FE AI filter

function uniq(arr) {
  return [...new Set((arr || []).filter(Boolean))];
}
function pickTime(x) {
  return new Date(x?.created_at || x?.createdAt || x?.time || x?.date || 0).getTime();
}

// klasifikasi ringan kombinasi sinyal BE + regex
function categorizeWithAI(s = {}) {
  const text = String(s?.content || "").toLowerCase();
  const tagsRaw = s?.moderation?.tags || s?.moderation?.labels || s?.tags || [];
  const tags = (Array.isArray(tagsRaw) ? tagsRaw : [tagsRaw]).map((t) => String(t || "").toLowerCase());

  let topics = [];
  if (tags.some((t) => /suicide|self[-\s]?harm|bunuh|akhiri|mengakhiri/.test(t))) topics.push("Suicide/Self-harm");
  if (tags.some((t) => /violence|abuse|assault|rape|pemerkosaan|kekerasan/.test(t))) topics.push("Violence/Abuse");
  if (tags.some((t) => /emergency|danger|threat|darurat|ancaman/.test(t))) topics.push("Immediate danger");

  if (/(suicide|kill myself|end my life|self[-\s]?harm|bunuh diri|akhiri hidup|mengakhiri hidup)/.test(text)) topics.push("Suicide/Self-harm");
  if (/(violence|abuse|assault|pemukulan|kekerasan|pemerkosaan|rape)/.test(text)) topics.push("Violence/Abuse");
  if (/(emergency|danger|darurat|ancaman|threat)/.test(text)) topics.push("Immediate danger");

  const flagged =
    Boolean(s?.is_sensitive) ||
    Boolean(s?.flagged) ||
    s?.status === "flagged" ||
    s?.moderation?.flagged === true;

  const topicsClean = uniq(topics);
  const sensitive = flagged || topicsClean.length > 0;

  return {
    sensitive,
    topics: topicsClean.join(", ") || "Sensitive content",
  };
}

export default function MainDark() {
  const [safeOnly, setSafeOnly] = useState(true);
  const [stories, setStories] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const tokenQ = searchParams.get("token");
  const [showBanner, setShowBanner] = useState(Boolean(tokenQ));

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const list = await fetchPostedStories();
        const normalized = Array.isArray(list) ? list : [];
        setStories(normalized);

        const map = {};
        for (const s of normalized) {
          try {
            const raw = await fetchCommentsByStory(s.id);
            const arr = Array.isArray(raw) ? raw : (raw?.items ?? []);
            map[s.id] = arr.slice().sort((a, b) => pickTime(b) - pickTime(a));
          } catch {
            map[s.id] = [];
          }
        }
        setCommentsMap(map);
      } catch (e) {
        setError(e?.message || "Failed to load stories");
        setStories([]);
        setCommentsMap({});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const viewStories = useMemo(() => {
    return (stories || [])
      .map((s) => ({ ...s, _meta: categorizeWithAI(s) }))
      .filter((s) => (safeOnly ? !s._meta.sensitive : true));
  }, [stories, safeOnly]);

  async function handleSubmitComment(storyId, text) {
    const val = text?.trim();
    if (!val) return;

    // FE AI filter — blok sebelum kirim ke BE
    const chk = isUnsafeText(val);
    if (chk.blocked) {
      alert(chk.reason || "Komentarmu melanggar pedoman dan tidak diposting.");
      return;
    }

    try {
      const c = await createComment(storyId, val);
      setCommentsMap((prev) => ({
        ...prev,
        [storyId]: [c, ...(prev[storyId] || [])],
      }));
    } catch (err) {
      const raw = String(err?.message || "");
      const human = /profan|toxic|unsafe|harm|dilarang|tidak pantas|bahaya/i.test(raw)
        ? "Komentarmu melanggar pedoman (bahasa tidak pantas/berbahaya) dan tidak diposting."
        : (raw || "Failed to post comment");
      alert(human);
    }
  }

  async function handleFlag(storyId) {
    try {
      await flagPostedStory(storyId);
      alert("Thank you. This story has been reported for moderator review.");
      setStories((prev) => prev.filter((x) => x.id !== storyId));
    } catch (e) {
      alert(e?.message || "Failed to flag story");
    }
  }

  return (
    <main className="relative isolate font-abhaya overflow-visible text-[#EEE3D9]">
      {showBanner && tokenQ && (
        <TokenDeletionBannerDark token={tokenQ} onClose={() => setShowBanner(false)} />
      )}

      {/* Leaves */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none">
        <img src={Leaf1} alt="" aria-hidden draggable="false"
             className="absolute w-[78px] sm:w-[90px] md:w-[130px] -top-[100px] -left-[100px] rotate-[90deg]" />
        <img src={Leaf3} alt="" aria-hidden draggable="false"
             className="absolute w-[76px] sm:w-[90px] md:w-[120px] -top-[100px] -right-[80px] -rotate-[50deg]" />
        <img src={Leaf2} alt="" aria-hidden draggable="false"
             className="absolute w-[80px] sm:w-[92px] md:w-[130px] bottom-[130px] -left-[80px] rotate-[50deg]" />
        <img src={Leaf4} alt="" aria-hidden draggable="false"
             className="absolute w-[82px] sm:w-[96px] md:w-[155px] bottom-[130px] -right-[90px] -rotate-[175deg]" />
      </div>

      <FilterTabsDark safeOnly={safeOnly} onChange={setSafeOnly} />
      <GuidelinesDark />

      <section className="mb-6 relative z-10">
        {loading && <p className="text-center">Loading…</p>}
        {!loading && error && <p className="text-center text-red-300">{error}</p>}
        {!loading && !error && viewStories.length === 0 && (
          <p className="text-center text-white/80">No stories yet.</p>
        )}

        {!loading && !error &&
          viewStories.map((s) => {
            const age = s.created_at ? fromNow(s.created_at) : "";
            const comments = commentsMap[s.id] || [];

            if (s._meta.sensitive) {
              return (
                <ContentWarningCardDark
                  key={s.id}
                  topics={s._meta.topics}
                  text={s.content}
                  age={age}
                  comments={comments}
                  onSubmitComment={(val) => handleSubmitComment(s.id, val)}
                  onFlag={() => handleFlag(s.id)}
                />
              );
            }

            return (
              <StoryCardDark
                key={s.id}
                id={s.id}
                text={s.content}
                age={age}
                comments={comments}
                onSubmitComment={(val) => handleSubmitComment(s.id, val)}
                onFlag={() => handleFlag(s.id)}
              />
            );
          })}
      </section>

      <div className="flex justify-center my-6">
        <button
          type="button"
          className="rounded-[10px] border px-6 py-2 hover:bg-white/10"
          style={{ borderColor: "#C65C33", color: "#C65C33" }}
          onClick={() => window.location.reload()}
        >
          Reload Stories
        </button>
      </div>

      <p className="text-center text-sm text-white/80">
        All stories are reviewed by trained moderators before publication.
      </p>

      <h2 className="font-aboreto text-center text-[22px] md:text-[26px] mt-10 mb-5 tracking-wide text-white">
        NEED SUPPORT?
      </h2>

      <div className="mx-auto w-full max-w-[1160px] flex flex-col sm:flex-row sm:justify-between items-start gap-4">
        <div className="w-full sm:w-[230px] md:w-[250px] rounded-[12px] px-4 py-3 text-center shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
             style={{ backgroundColor: "#F6C88D", color: "#2B2521" }}>
          <p className="font-abhaya font-bold leading-tight text-[13px] md:text-[14px]">Crisis Text Line</p>
          <p className="font-abhaya text-[12px] md:text-[13px]">Text HOME to 741741</p>
        </div>
        <div className="w-full sm:w-[230px] md:w-[250px] rounded-[12px] px-4 py-3 text-center shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
             style={{ backgroundColor: "#F6C88D", color: "#2B2521" }}>
          <p className="font-abhaya font-bold leading-tight text-[13px] md:text-[14px]">National Suicide Prevention Lifeline</p>
          <p className="font-abhaya text-[12px] md:text-[13px]">Call or text 988</p>
        </div>
      </div>
    </main>
  );
}
