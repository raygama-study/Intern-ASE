// src/Pages/Moderator/Dashboard.jsx
import React from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import { ClipboardList, AlertTriangle, TrendingUp, UsersRound } from "lucide-react";

function Card({ title, value, delta, icon }) {
  return (
    <div className="rounded-[12px] border border-[#E6E0DA] bg-white p-5 shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between mb-3">
        <p className="font-abhaya text-[15px]">{title}</p>
        {icon}
      </div>
      <p className="text-[28px] font-abhaya">{value}</p>
      <p className="text-sm text-darkText/70 mt-2">{delta}</p>
    </div>
  );
}

function ProgressCard() {
  return (
    <div className="rounded-[12px] border border-[#E6E0DA] bg-white p-6 shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <h3 className="font-abhaya text-[18px] mb-4">Review Progress</h3>
      <p className="text-sm mb-2">Daily target reviews (50) <span className="float-right">23/50</span></p>
      <div className="h-2 bg-[#E6E0DA] rounded-full mb-4">
        <div className="h-2 bg-[#C65C33] rounded-full w-[46%]" />
      </div>
      <p className="text-sm mb-2">Emergency respond time</p>
      <div className="h-2 bg-[#E6E0DA] rounded-full">
        <div className="h-2 bg-black rounded-full w-[90%]" />
      </div>
      <p className="text-xs mt-2 text-[#C65C33]">Average : 12 min</p>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="rounded-[12px] border border-[#E6E0DA] bg-white p-6 shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <h3 className="font-abhaya text-[18px] mb-4">Recent Activity</h3>
      {[
        { dot: "bg-green-500", text: "Story #4321 Approved by Amba", time: "2 min ago" },
        { dot: "bg-red-500", text: "Emergency Case #2567 escalated", time: "5 min ago" },
        { dot: "bg-amber-500", text: "Story #3245 flag for review", time: "7 min ago" },
      ].map((a, i) => (
        <div key={i} className="flex items-center justify-between rounded-[10px] bg-[#F5F0EA] px-4 py-3 mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${a.dot}`} />
            <p className="font-abhaya">{a.text}</p>
          </div>
          <span className="text-sm text-darkText/70">{a.time}</span>
        </div>
      ))}
    </div>
  );
}

function NoticeBar() {
  return (
    <div className="px-6 md:px-10 py-6 border-t border-[#E6E0DA] text-center text-[15px]">
      All action are locked for security and compliance. Story must be reviewed within 48 hours
      (Emergency cases : 30 minutes ).
    </div>
  );
}

export default function ModeratorDashboard() {
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
            DASHBOARD OVERVIEW
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-6">
            <Card title="Pending Reviews" value="47" delta="+12% From last week" icon={<ClipboardList className="w-5 h-5 text-primary" />} />
            <Card title="Emergency cases" value="3" delta="+1% From last week" icon={<AlertTriangle className="w-5 h-5 text-primary" />} />
            <Card title="Approve Today" value="23" delta="+8% From last week" icon={<TrendingUp className="w-5 h-5 text-primary" />} />
            <Card title="Active Moderator" value="2" delta="No change from last week" icon={<UsersRound className="w-5 h-5 text-primary" />} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ProgressCard />
            <RecentActivity />
          </div>
        </div>

        <NoticeBar />
      </div>
    </div>
  );
}
