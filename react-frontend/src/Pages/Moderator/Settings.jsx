// src/Pages/Moderator/Settings.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Moderator/Sidebar";
import ToggleSwitch from "../Components/Moderator/ToggleSwitch";
import NoticeBar from "../Components/Moderator/NoticeBar";
import { ChevronDown } from "lucide-react";
import { prefs } from "../../utils/prefs";

export default function Settings() {
  // init dari localStorage
  const [emergencyAlert, setEmergencyAlert] = useState(prefs.getEmergencyAlert());
  const [dailySummary, setDailySummary] = useState(prefs.getDailySummary());
  const [soundNotif, setSoundNotif]   = useState(prefs.getSoundNotif());

  const [assignMode, setAssignMode]   = useState(prefs.getAssignMode());
  const [dailyTarget, setDailyTarget] = useState(prefs.getDailyTarget());

  // pastikan jika tab/halaman lain mengubah prefs, form ikut refresh
  useEffect(() => {
    const unsub = (e) => {
      const p = e.detail || prefs.getAll();
      setEmergencyAlert(p.emergencyAlert);
      setDailySummary(p.dailySummary);
      setSoundNotif(p.soundNotif);
      setAssignMode(p.assignMode);
      setDailyTarget(p.dailyTarget);
    };
    window.addEventListener("vu:prefs_changed", unsub);
    return () => window.removeEventListener("vu:prefs_changed", unsub);
  }, []);

  return (
    <div className="min-h-screen bg-background text-darkText flex">
      <Sidebar />

      <main className="flex-1 px-6 md:px-10 py-8">
        <h1 className="font-aboreto text-[26px] md:text-[30px] tracking-wide">
          MODERATOR DASHBOARD
        </h1>
        <h2 className="mt-3 font-aboreto text-[22px] md:text-[26px] tracking-wide">
          SETTING
        </h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="rounded-[12px] bg-white border border-[#E6E0DA] shadow-[0_4px_12px_rgba(0,0,0,0.07)] p-6">
            <h3 className="font-aboreto text-[18px] md:text-[20px] tracking-wide mb-4">
              NOTIFICATION PREFERENCES
            </h3>

            <div className="py-3 flex items-center justify-between border-b border-[#F0EBE6]">
              <div>
                <p className="font-abhaya text-[16px]">Emergency Alert</p>
                <p className="text-sm text-darkText/70">
                  Get notified immediately for emergency cases
                </p>
              </div>
              <ToggleSwitch
                checked={emergencyAlert}
                onChange={(v) => { setEmergencyAlert(v); prefs.setEmergencyAlert(v); }}
                ariaLabel="Toggle Emergency Alert"
              />
            </div>

            <div className="py-3 flex items-center justify-between border-b border-[#F0EBE6]">
              <div>
                <p className="font-abhaya text-[16px]">Daily Summary</p>
                <p className="text-sm text-darkText/70">
                  Receive daily moderation summary emails
                </p>
              </div>
              <ToggleSwitch
                checked={dailySummary}
                onChange={(v) => { setDailySummary(v); prefs.setDailySummary(v); }}
                ariaLabel="Toggle Daily Summary"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-abhaya text-[16px]">Sound Notification</p>
                <p className="text-sm text-darkText/70">
                  Play sound for new Submission
                </p>
              </div>
              <ToggleSwitch
                checked={soundNotif}
                onChange={(v) => { setSoundNotif(v); prefs.setSoundNotif(v); }}
                ariaLabel="Toggle Sound Notification"
              />
            </div>
          </section>

          <section className="rounded-[12px] bg-white border border-[#E6E0DA] shadow-[0_4px_12px_rgba(0,0,0,0.07)] p-6">
            <h3 className="font-aboreto text-[18px] md:text-[20px] tracking-wide mb-4">
              REVIEW SETTINGS
            </h3>

            <div className="mb-5">
              <p className="font-abhaya text-[16px] mb-2">Auto-Assign Reviews</p>
              <div className="relative">
                <select
                  value={assignMode}
                  onChange={(e) => { setAssignMode(e.target.value); prefs.setAssignMode(e.target.value); }}
                  className="w-full h-[42px] rounded-[10px] border border-[#E6E0DA] bg-white px-3 pr-10 font-abhaya appearance-none"
                >
                  <option value="balance">Balance Assignment</option>
                  <option value="round_robin">Round-robin</option>
                  <option value="load_based">Load-based</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-darkText/70" />
              </div>
            </div>

            <div>
              <p className="font-abhaya text-[16px] mb-2">Daily Review Target</p>
              <div className="relative">
                <select
                  value={dailyTarget}
                  onChange={(e) => { setDailyTarget(e.target.value); prefs.setDailyTarget(e.target.value); }}
                  className="w-full h-[42px] rounded-[10px] border border-[#E6E0DA] bg-white px-3 pr-10 font-abhaya appearance-none"
                >
                  <option value="30">30 reviews</option>
                  <option value="40">40 reviews</option>
                  <option value="50">50 reviews</option>
                  <option value="60">60 reviews</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-darkText/70" />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10">
          <NoticeBar />
        </div>
      </main>
    </div>
  );
}
