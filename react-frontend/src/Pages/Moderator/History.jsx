import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../Components/Moderator/Sidebar";
import ReviewCard from "../Components/Moderator/ReviewCard";
import NoticeBar from "../Components/Moderator/NoticeBar";
import { fetchReviewedStories } from "../../utils/api";
import { fromNow } from "../../utils/time";

export default function History() {
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("storyId");

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchReviewedStories();
      let arr = Array.isArray(data) ? data : [];

      if (storyId) {
        arr = arr.filter((x) => String(x.id) === String(storyId));
      }
      setReviews(arr);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [storyId]);

  return (
    <div className="min-h-screen bg-background text-darkText flex">
      <Sidebar />

      <main className="flex-1 px-6 md:px-10 py-8">
        <h1 className="font-aboreto text-[26px] md:text-[30px] tracking-wide">
          MODERATOR DASHBOARD
        </h1>

        <div className="mt-3 mb-4">
          <h2 className="font-aboreto text-[22px] md:text-[26px] tracking-wide">
            REVIEW HISTORY
          </h2>

          {storyId && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#C65C33] text-[#C65C33] px-3 py-1 text-sm">
              Filtered by Story ID: <span className="font-semibold">{storyId}</span>
            </div>
          )}
        </div>

        <section>
          {loading ? (
            <p className="font-abhaya">Loading…</p>
          ) : reviews.length === 0 ? (
            <p className="font-abhaya">No history found.</p>
          ) : (
            reviews.map((r) => (
              <ReviewCard
                key={r.id}
                text={r.content}
                time={r.created_at ? fromNow(r.created_at) : ""}
                tags={r.tags || []}
                status={r.status === "deleted" ? "Rejected" : "Approved"}
                note={r.note || ""}
              />
            ))
          )}
        </section>

        <div className="mt-8">
          <NoticeBar />
        </div>
      </main>
    </div>
  );
}
