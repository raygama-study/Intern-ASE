import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import { ClipboardList, AlertTriangle, TrendingUp, UsersRound } from "lucide-react";
import { apiGet, fetchHeldStories, fetchPostedStories } from "../../utils/api";

function Card({ title, value, delta, icon }) {
  return (
    <div className="rounded-[12px] border border-[#E6E0DA] bg-white p-5 shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between mb-3">
        <p className="font-abhaya text-[15px]">{title}</p>
        {icon}
      </div>
      <p className="text-[28px] font-abhaya">{value}</p>
      {delta ? <p className="text-sm text-darkText/70 mt-2">{delta}</p> : null}
    </div>
  );
}

function ProgressCard({ approvedToday, target = 50 }) {
  const pct = Math.max(0, Math.min(100, Math.round((approvedToday / target) * 100)));
  return (
    <div className="rounded-[12px] border border-[#E6E0DA] bg-white p-6 shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <h3 className="font-abhaya text-[18px] mb-4">Review Progress</h3>

      <p className="text-sm mb-2">
        Daily target reviews ({target}) <span className="float-right">{approvedToday}/{target}</span>
      </p>
      <div className="h-2 bg-[#E6E0DA] rounded-full mb-4">
        <div className="h-2 bg-[#C65C33] rounded-full" style={{ width: `${pct}%` }} />
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
        { dot: "bg-green-500", text: "Story #4321 Approved", time: "2 min ago" },
        { dot: "bg-red-500", text: "Emergency Case escalated", time: "5 min ago" },
        { dot: "bg-amber-500", text: "Story flagged for review", time: "7 min ago" },
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

function isToday(ts) {
  if (!ts) return false;
  const d = new Date(ts);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function ModeratorDashboard() {
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(0);
  const [emergency, setEmergency] = useState(0);
  const [approvedToday, setApprovedToday] = useState(0);
  const [activeModerator, setActiveModerator] = useState(1); 

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        // 1) Pending = jumlah HELD
        let held = [];
        try {
          held = await fetchHeldStories(); 
        } catch (e) {
          if (String(e?.message || "").includes("(404)")) console.debug("held not available");
          else console.debug(e);
        }
        if (!cancelled) setPending(Array.isArray(held) ? held.length : 0);

        let posted = [];
        try {
          posted = await fetchPostedStories(); 
        } catch (e) {
          if (String(e?.message || "").includes("(404)")) console.debug("posted not available");
          else console.debug(e);
        }
        const approvedCount = (posted || []).filter((s) => isToday(s?.created_at)).length;
        if (!cancelled) setApprovedToday(approvedCount);

        async function tryEmergency() {
          const tries = ["/stories?status=emergency", "/stories/emergency"];
          for (const path of tries) {
            try {
              const res = await apiGet(path);
              const arr = Array.isArray(res) ? res : (res?.items ?? []);
              if (arr && arr.length >= 0) return arr.length;
            } catch (e) {
              if (!String(e?.message || "").includes("(404)")) console.debug("emergency fetch:", e);
            }
          }
          return 0;
        }
        const emerCount = await tryEmergency();
        if (!cancelled) setEmergency(emerCount);

        async function tryActiveModerators() {
          const candidates = ["/moderators/active", "/moderator/active"];
          for (const path of candidates) {
            try {
              const res = await apiGet(path);
              const val =
                typeof res === "number"
                  ? res
                  : Array.isArray(res)
                  ? res.length
                  : res?.count ?? res?.total ?? null;
              if (val != null) return val;
            } catch (e) {
              if (!String(e?.message || "").includes("(404)")) console.debug("active mod fetch:", e);
            }
          }
          return 1;
        }
        const act = await tryActiveModerators();
        if (!cancelled) setActiveModerator(act);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const deltas = useMemo(
    () => ({
      pending: "+12% From last week",
      emergency: "+1% From last week",
      approved: "+8% From last week",
      moderators: "No change from last week",
    }),
    []
  );

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
            DASHBOARD OVERVIEW
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-6">
            <Card title="Pending Reviews" value={loading ? "…" : pending} delta={deltas.pending} icon={<ClipboardList className="w-5 h-5" />} />
            <Card title="Emergency cases" value={loading ? "…" : emergency} delta={deltas.emergency} icon={<AlertTriangle className="w-5 h-5" />} />
            <Card title="Approved Today" value={loading ? "…" : approvedToday} delta={deltas.approved} icon={<TrendingUp className="w-5 h-5" />} />
            <Card title="Active Moderator" value={loading ? "…" : activeModerator} delta={deltas.moderators} icon={<UsersRound className="w-5 h-5" />} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ProgressCard approvedToday={approvedToday} />
            <RecentActivity />
          </div>
        </div>

        <NoticeBar />
      </div>
    </div>
  );
}
