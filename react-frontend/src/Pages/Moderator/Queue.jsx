// src/Pages/Moderator/Queue.jsx
import React from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import QueueItem from "../Components/Moderator/QueueItem";

function NoticeBar() {
  return (
    <div className="px-6 md:px-10 py-6 border-t border-[#E6E0DA] text-center text-[15px]">
      All action are locked for security and compliance. Story must be reviewed within 48 hours
      (Emergency cases : 30 minutes ).
    </div>
  );
}

const SAMPLE = [
  {
    excerpt:
      "Living with chronic depression has been challenging. Some days I struggle to get out of bed and feel completely overwhelmed by simple tasks. I often think about ending it all...",
    timeAgo: "4 hours ago",
    tags: [
      { label: "Potential suicide risk", tone: "danger" },
      { label: "Depression", tone: "soft" },
      { label: "Emergency", tone: "danger" },
    ],
  },
  {
    excerpt:
      "I want to share my experience with workplace harassment that happened over several months. It affected my mental health significantly and I felt I had nowhere to turn...",
    timeAgo: "6 hours ago",
    tags: [
      { label: "Mental Health" },
      { label: "Workplace Harassment" },
    ],
  },
  {
    excerpt:
      "After years of domestic violence, I finally found the courage to leave. The healing process has been difficult but I want others to know there is hope...",
    timeAgo: "8 hours ago",
    tags: [],
  },
];

export default function ModeratorQueue() {
  return (
    <div className="min-h-screen bg-background text-darkText flex">
      {/* Sidebar */}
      <div className="w-[260px] shrink-0 border-r border-[#E6E0DA] bg-[#EFE7DD]/60">
        <Sidebar />
      </div>

      {/* Main */}
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

          {SAMPLE.map((it, i) => (
            <QueueItem
              key={i}
              excerpt={it.excerpt}
              timeAgo={it.timeAgo}
              tags={it.tags}
              onApprove={() => console.log("approve", i)}
              onReject={() => console.log("reject", i)}
              onEscalate={() => console.log("escalate", i)}
              onHistory={() => console.log("history", i)}
            />
          ))}
        </div>

        <NoticeBar />
      </div>
    </div>
  );
}
