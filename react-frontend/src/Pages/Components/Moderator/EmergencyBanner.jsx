// src/Pages/Components/Moderator/EmergencyBanner.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <div className="rounded-[10px] border border-[#E9A3A0] bg-[#FBEAEA] text-[#9E3D37] px-5 py-4 mb-6">
      <div className="flex items-center gap-3 font-abhaya">
        <AlertTriangle className="w-5 h-5" />
        <p className="font-semibold">Emergency protocol active</p>
      </div>
      <p className="mt-2 text-sm">
        All emergency must be reviewed in 30 minutes. Crisis intervention team
        has been notified.
      </p>
    </div>
  );
}
