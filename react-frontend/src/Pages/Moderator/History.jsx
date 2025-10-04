// src/Pages/Moderator/History.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../Components/Moderator/Sidebar";
import ReviewCard from "../Components/Moderator/ReviewCard";
import NoticeBar from "../Components/Moderator/NoticeBar";
import ReviewStoryModal from "../Components/Moderator/ReviewStoryModal";
import { fetchReviewedStories } from "../../utils/api";
import { fromNow } from "../../utils/time";

const REVIEW_OPTIONS = [
  { value: "all", label: "All Reviews" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "escalated", label: "Escalated" },
];

const TIME_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "all", label: "All time" },
];

function inRange(ts, range) {
  if (!ts) return false;
  const d = new Date(ts);
  const now = new Date();
  if (range === "today") {
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }
  if (range === "week") {
    const start = new Date(now);
    start.setDate(now.getDate() - 7);
    return d >= start && d <= now;
  }
  if (range === "month") {
    const start = new Date(now);
    start.setMonth(now.getMonth() - 1);
    return d >= start && d <= now;
  }
  return true;
}

export default function History() {
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("storyId");

  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewType, setReviewType] = useState("approved");
  const [timeRange, setTimeRange] = useState("week");

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let data = await fetchReviewedStories();
        data = Array.isArray(data) ? data : [];
        if (storyId) {
          data = data.filter((x) => String(x.id) === String(storyId));
        }
        setAll(data);
      } catch {
        setAll([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [storyId]);

  const items = useMemo(() => {
    const normalizeStatus = (r) => {
      if (r.status === "Approved" || r.status === "Rejected" || r.status === "Escalated")
        return r.status;
      if (String(r?.status).toLowerCase() === "deleted") return "Rejected";
      const tags = (r.tags || r?.moderation?.tags || []).map((t) =>
        String(typeof t === "string" ? t : t?.label || "").toLowerCase()
      );
      if (tags.some((t) => /emergency|escalate/.test(t))) return "Escalated";
      return "Approved";
    };

    return (all || [])
      .map((r) => ({
        ...r,
        _status: normalizeStatus(r),
        _reviewedAt: r.reviewed_at || r.updated_at || r.moderated_at || r.created_at,
      }))
      .filter((r) => (reviewType === "all" ? true : r._status.toLowerCase() === reviewType))
      .filter((r) => inRange(r._reviewedAt, timeRange))
      .sort((a, b) => new Date(b._reviewedAt || 0) - new Date(a._reviewedAt || 0));
  }, [all, reviewType, timeRange]);

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

          {/* Filter bar */}
          <div className="mt-4 flex flex-wrap gap-3">
            <select
              value={reviewType}
              onChange={(e) => setReviewType(e.target.value)}
              className="rounded-[8px] border border-[#E6E0DA] bg-white px-3 py-2 text-sm font-abhaya"
            >
              {REVIEW_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-[8px] border border-[#E6E0DA] bg-white px-3 py-2 text-sm font-abhaya"
            >
              {TIME_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <section>
          {loading ? (
            <p className="font-abhaya">Loading…</p>
          ) : items.length === 0 ? (
            <p className="font-abhaya">No history found.</p>
          ) : (
            items.map((r, idx) => (
              <ReviewCard
                key={`${r._status}-${r.id ?? idx}`}
                text={r.content}
                time={r._reviewedAt ? fromNow(r._reviewedAt) : ""}
                tags={r.tags || []}
                status={r._status}
                note={r.note || ""}
                onView={() => {
                  setCurrent(r);
                  setOpen(true);
                }}
              />
            ))
          )}
        </section>

        <div className="mt-8">
          <NoticeBar />
        </div>
      </main>

      <ReviewStoryModal
        open={open}
        item={current}
        onClose={() => {
          setOpen(false);
          setCurrent(null);
        }}
        onApprove={() => setOpen(false)}
        onReject={() => setOpen(false)}
      />
    </div>
  );
}
