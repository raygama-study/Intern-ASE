import React, { useMemo, useState } from "react";
import { Trash2, X } from "lucide-react";
import { deleteStoryByDeletionToken } from "../../../utils/api";

export default function TokenDeletionBanner({ token, onClose }) {
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
    <div className="rounded-[12px] border border-[#E8C9B5] bg-[#F4EBDC] px-4 py-3 md:px-5 md:py-4 mb-4 shadow-[0_6px_14px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-abhaya text-[15px]">
            Deletion token detected. You can delete your story using this token:
          </p>
          <code className="inline-block bg-[#F6C88D] text-darkText rounded-md px-2 py-1 mt-1">
            {shortToken}
          </code>
          {msg && <p className="mt-2 text-sm text-[#C65C33]">{msg}</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="h-[36px] px-4 rounded-[10px] bg-brand-700 text-white flex items-center gap-2 hover:opacity-95 disabled:opacity-60"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] w-[36px] rounded-[10px] border border-[#E8C9B5] hover:bg-white/60 grid place-items-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
