import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import NoticeBar from "../Components/Moderator/NoticeBar";
import EmergencyBanner from "../Components/Moderator/EmergencyBanner";
import EmergencyCaseCard from "../Components/Moderator/EmergencyCaseCard";
import { fetchEmergencyStories } from "../../utils/api";
import { fromNow } from "../../utils/time";

export default function Emergency() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchEmergencyStories();
      setCases(Array.isArray(data) ? data : []);
    } catch {
      setCases([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

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
            {loading ? "Loading…" : `${cases.length} cases requiring immediate attention`}
          </p>
        </div>

        <EmergencyBanner />

        {loading ? (
          <p className="font-abhaya">Loading…</p>
        ) : cases.length === 0 ? (
          <p className="font-abhaya">No emergency cases.</p>
        ) : (
          cases.map((c) => (
            <EmergencyCaseCard
              key={c.id}
              text={c.content}
              time={c.created_at ? fromNow(c.created_at) : ""}
              tags={[{ label: "Emergency", tone: "danger" }]}
            />
          ))
        )}

        <div className="mt-8">
          <NoticeBar />
        </div>
      </main>
    </div>
  );
}
