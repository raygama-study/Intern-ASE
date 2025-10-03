import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import QueueItem from "../Components/Moderator/QueueItem";
import { fetchHeldStories, unflagStory, deleteStoryById } from "../../utils/api";
import { fromNow } from "../../utils/time";

function NoticeBar() {
  return (
    <div className="px-6 md:px-10 py-6 border-t border-[#E6E0DA] text-center text-[15px]">
      All action are locked for security and compliance. Story must be reviewed within 48 hours
      (Emergency cases : 30 minutes ).
    </div>
  );
}

export default function ModeratorQueue() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchHeldStories(); 
      const mapped = (data || []).map((s) => ({
        id: s.id,
        content: s.content,
        timeAgo: s.created_at ? fromNow(s.created_at) : "",
        tags: [{ label: "Flagged" }],
      }));
      setItems(mapped);
    } catch (e) {
      console.error("Failed to load flagged stories:", e);
      alert(e.message || "Failed to load flagged stories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleApprove(item) {
    try {
      await unflagStory(item.id);     
      await load();
    } catch (e) {
      console.error("Unflag failed:", e);
      alert(e.message || "Unflag failed");
    }
  }

  async function handleReject(item) {
    try {
      await deleteStoryById(item.id); 
      await load();
    } catch (e) {
      console.error("Delete failed:", e);
      alert(e.message || "Delete failed");
    }
  }

  return (
    <div className="min-h-screen bg-background text-darkText flex">
      <div className="w-[260px] shrink-0 border-r border-[#E6E0DA] bg-[#EFE7DD]/60">
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0">
        <div className="border-b border-[#E6E0DA] sticky top-0 bg-background/80 backdrop-blur z-10">
          <h1 className="font-aboreto text-[22px] md:text-[26px] tracking-wide text-center py-4">
            MODERATOR DASHBOARD
          </h1>
        </div>

        <div className="px-6 md:px-10 py-6">
          <h2 className="font-aboreto text-[20px] md:text-[22px] tracking-wide mb-6">
            MODERATION QUEUE
          </h2>

          {loading ? (
            <p className="font-abhaya">Loading…</p>
          ) : items.length === 0 ? (
            <p className="font-abhaya">No flagged stories.</p>
          ) : (
            items.map((it) => (
              <QueueItem
                key={it.id}
                excerpt={it.content}
                timeAgo={it.timeAgo}
                tags={it.tags}
                onApprove={() => handleApprove(it)}
                onReject={() => handleReject(it)}
                showEscalate={false}          // BE tidak punya escalate
                onHistory={() => console.log("history", it.id)}
              />
            ))
          )}
        </div>

        <NoticeBar />
      </div>
    </div>
  );
}
