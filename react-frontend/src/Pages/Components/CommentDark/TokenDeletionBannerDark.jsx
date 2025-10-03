import React, { useMemo, useState } from "react";
import { Trash2, X } from "lucide-react";
import { deleteStoryByDeletionToken } from "../../../utils/api";

export default function TokenDeletionBannerDark({ token, onClose }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const shortToken = useMemo(() => token?.slice(0, 32) || "", [token]);

  if (!token) return null;

  async function handleDelete() {
    setMsg("");
    setBusy(true);
    try {
      await deleteStoryByDeletionToken(token);
      setMsg("Story deleted successfully.");
      setTimeout(() => window.location.reload(), 600);
    } catch (e) {
      setMsg(e?.message || "Failed to delete story");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="rounded-[12px] px-4 py-3 md:px-5 md:py-4 mb-4 shadow-[0_6px_14px_rgba(0,0,0,0.25)] border"
      style={{ background: "#2B2521", borderColor: "rgba(179,107,28,0.40)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-abhaya text-[15px] text-[#EEE3D9]">
            Deletion token detected. You can delete your story using this token:
          </p>
          <code className="inline-block rounded-md px-2 py-1 mt-1"
                style={{ background: "#3A322D", color: "#EEE3D9" }}>
            {shortToken}
          </code>
          {msg && <p className="mt-2 text-sm" style={{ color: "#C65C33" }}>{msg}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="h-[36px] px-4 rounded-[10px] text-white font-abhaya flex items-center gap-2 hover:opacity-95 disabled:opacity-60"
            style={{ background: "#C65C33", boxShadow: "0 8px 22px rgba(198,92,51,0.35)" }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] w-[36px] rounded-[10px] grid place-items-center hover:bg-white/10"
            style={{ border: "1px solid rgba(179,107,28,0.40)" }}
          >
            <X className="w-4 h-4 text-[#EEE3D9]" />
          </button>
        </div>
      </div>
    </div>
  );
}
