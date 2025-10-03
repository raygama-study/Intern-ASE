import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import NoticeBar from "../Components/Moderator/NoticeBar";
import EmergencyBanner from "../Components/Moderator/EmergencyBanner";
import EmergencyCaseCard from "../Components/Moderator/EmergencyCaseCard";
import { fetchHeldStories, unflagStory, deleteStoryById, flagPostedStory } from "../../utils/api";
import { fromNow } from "../../utils/time";

// Heuristik sederhana untuk mendeteksi konten darurat
function isEmergencyText(txt = "") {
  const s = String(txt).toLowerCase();
  const keywords = [
    // suicide / self-harm (EN)
    "suicide", "kill myself", "end my life", "self harm", "harm myself",
    // suicide / self-harm (ID)
    "bunuh diri", "akhiri hidup", "mengakhiri hidup", "melukai diri",
    // danger / violence / urgent
    "immediate danger", "emergency", "kekerasan", "ancaman", "darurat", "tolong cepat",
  ];
  return keywords.some(k => s.includes(k));
}

export default function Emergency() {
  const [held, setHeld] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const data = await fetchHeldStories();
      setHeld(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message || "Failed to load flagged stories");
      setHeld([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const emergencyCases = useMemo(
    () =>
      (held || [])
        .filter(x => isEmergencyText(x?.content))
        .map(x => ({
          id: x.id,
          text: x.content,
          time: x.created_at ? fromNow(x.created_at) : "",
        })),
    [held]
  );


  async function handleApprove(id) {
    try {
      await unflagStory(id); 
    } catch (e) {
      alert(e?.message || "Approve failed");
      return;
    }
    await load();
    alert("Story unflagged (approved) and returned to posted.");
  }

  async function handleReject(id) {
    try {
      await deleteStoryById(id); 
    } catch (e) {
      alert(e?.message || "Reject failed");
      return;
    }
    await load();
    alert("Story deleted.");
  }

  async function handleEscalate(id) {
  
    try {
      await flagPostedStory(id);
    } catch {
      
    }
    alert(
      "Escalated.\n\nBelum ada route BE khusus 'emergency'. Ikuti SOP krisis internal (hubungi crisis team/hotline)."
    );
  }

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
            {loading
              ? "Loading…"
              : err
              ? err
              : `${emergencyCases.length} cases requiring immediate attention`}
          </p>
        </div>

        <EmergencyBanner />

        {loading ? (
          <p className="font-abhaya">Loading…</p>
        ) : emergencyCases.length === 0 ? (
          <p className="font-abhaya">No emergency cases.</p>
        ) : (
          emergencyCases.map((c) => (
            <EmergencyCaseCard
              key={c.id}
              text={c.text}
              time={c.time}
              tags={[{ label: "Emergency", tone: "danger" }]}
              onApprove={() => handleApprove(c.id)}
              onReject={() => handleReject(c.id)}
              onEscalate={() => handleEscalate(c.id)}
              onHistory={() => (window.location.href = `/moderator/history?storyId=${c.id}`)}
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
