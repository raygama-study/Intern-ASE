import React from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import ReviewCard from "../Components/Moderator/ReviewCard";
import NoticeBar from "../Components/Moderator/NoticeBar";

export default function History() {
  // data contoh – ganti dengan data API nanti
  const REVIEWS = [
    {
      text:
        "I want to share my experience with workplace harassment that happened over several months. It affected my mental health significantly and I felt I had nowhere to turn…",
      time: "2 hours ago",
      tags: ["Workplace Harassment", "Mental Health"],
      status: "Approved",
      note:
        "Well-written, provides valuable perspective on workplace harassment.",
    },
    {
      text:
        "After years of domestic violence, I finally found the courage to leave. The healing process has been difficult but I want others to know there is hope…",
      time: "2 hours ago",
      tags: ["Workplace Harassment", "Mental Health"],
      status: "Approved",
      note:
        "Inspiring recovery story, appropriate for publication.",
    },
  ];

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
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-5">
          <select
            className="h-[40px] rounded-[10px] border border-[#E6E0DA] bg-white px-3 font-abhaya"
            defaultValue="all"
          >
            <option value="all">All Reviews</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>

          <select
            className="h-[40px] rounded-[10px] border border-[#E6E0DA] bg-white px-3 font-abhaya"
            defaultValue="week"
          >
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
        </div>

        {/* list */}
        <section>
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </section>

        {/* notice */}
        <div className="mt-8">
          <NoticeBar />
        </div>
      </main>
    </div>
  );
}
