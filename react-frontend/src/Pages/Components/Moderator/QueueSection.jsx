import React from "react";
import QueueItem from "./QueueItem";

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

export default function QueueSection() {
  return (
    <>
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
    </>
  );
}
