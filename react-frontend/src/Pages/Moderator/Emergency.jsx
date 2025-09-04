// src/Pages/Moderator/Emergency.jsx
import React from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import NoticeBar from "../Components/Moderator/NoticeBar";
import EmergencyBanner from "../Components/Moderator/EmergencyBanner";
import EmergencyCaseCard from "../Components/Moderator/EmergencyCaseCard";

export default function Emergency() {
  // contoh data 1 kasus (nanti bisa ganti dari API)
  const CASES = [
    {
      text:
        "Living with chronic depression has been challenging. Some days I struggle to get out of bed and feel completely overwhelmed by simple tasks. I often think about ending it all...",
      time: "4 hours ago",
      tags: [
        { label: "Potential suicide risk", tone: "danger" },
        { label: "Depression", tone: "warn" },
        { label: "Emergency", tone: "danger" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-darkText flex">
      <Sidebar />

      <main className="flex-1 px-6 md:px-10 py-8">
        <h1 className="font-aboreto text-[26px] md:text-[30px] tracking-wide mb-1">
          MODERATOR DASHBOARD
        </h1>

        <div className="mt-2 mb-6">
          <h2 className="font-aboreto text-[22px] md:text-[26px] tracking-wide">
            EMERGENCY CASES
          </h2>
          <p className="text-[#C65C33]/80 mt-1">
            1 cases requiring immediate attention
          </p>
        </div>

        <EmergencyBanner />

        {CASES.map((c, i) => (
          <EmergencyCaseCard key={i} {...c} />
        ))}

        <div className="mt-8">
          <NoticeBar />
        </div>
      </main>
    </div>
  );
}
