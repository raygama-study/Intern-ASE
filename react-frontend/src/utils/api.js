const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3030";

function authHeader() {
  const token = localStorage.getItem("vu:token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res, path) {
  let json;
  try { json = await res.json(); } catch {}
  if (!res.ok) {
    const msg =
      json?.payload?.message ||
      json?.message ||
      `Request to ${path} failed (${res.status})`;
    throw new Error(msg);
  }
  return json?.payload?.datas ?? json;
}

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
  });
  return handle(res, path);
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body ?? {}),
  });
  return handle(res, path);
}

export async function apiPut(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body ?? {}),
  });
  return handle(res, path);
}

export async function apiDelete(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader() },
  });
  return handle(res, path);
}

/* GET yang “diam” untuk endpoint opsional */
export async function apiGetOptional(path, defaultVal = []) {
  try {
    return await apiGet(path);
  } catch (e) {
    const m = String(e?.message || "");
    if (m.includes("(404)") || m.includes("(403)") || m.includes("(401)")) {
      return defaultVal;
    }
    throw e;
  }
}

/* Auth */
export async function loginModerator({ username, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (json?.payload?.statusCode !== 200) {
    throw new Error(json?.payload?.message || "Invalid credentials");
  }
  return json.payload.datas; // { token, user }
}

/* Stories (public/moderator mix) */
export async function fetchPostedStories() {
  return apiGet("/stories/posted");
}

export async function fetchCommentsByStory(storyId) {
  return apiGet(`/stories/${storyId}/comments`);
}

export async function createComment(storyId, content) {
  const res = await fetch(`${BASE_URL}/stories/${storyId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return handle(res, `/stories/${storyId}/comments`);
}

export async function submitStory({ content, images = [], categoryIds = [] }) {
  const fd = new FormData();
  fd.append("content", content);
  (categoryIds || []).forEach((id) => fd.append("categoryIds", id));
  (images || []).forEach((f) => fd.append("images", f));
  const res = await fetch(`${BASE_URL}/stories`, {
    method: "POST",
    headers: { ...authHeader() },
    body: fd,
  });
  return handle(res, "/stories");
}

/* Moderator data */
export async function fetchHeldStories() {
  const res = await apiGetOptional("/stories/flagged", []);
  return Array.isArray(res) ? res : (res?.items ?? []);
}

export async function unflagStory(id) {
  return apiPut(`/stories/flagged/${id}/unflag`, {});
}

export async function flagPostedStory(id) {
  return apiPut(`/stories/posted/${id}/flag`, {});
}

export async function deleteStoryById(id) {
  return apiDelete(`/stories/${id}`);
}

export async function fetchEmergencyStories() {
  const a = await apiGetOptional("/stories?status=emergency", []);
  if (Array.isArray(a) && a.length) return a;
  const b = await apiGetOptional("/stories/emergency", []);
  return Array.isArray(b) ? b : (b?.items ?? []);
}

/* History (approved/rejected) */
async function getList(paths) {
  for (const p of paths) {
    const data = await apiGetOptional(p, []);
    if (Array.isArray(data) && data.length) return data;
    if (data?.items && data.items.length) return data.items;
  }
  return [];
}

export async function fetchReviewedStories(filter = {}) {
  const status = filter.status ?? "all";

  const mapItem = (it, forcedStatus) => ({
    ...it,
    status: forcedStatus,
    reviewed_at: it.updated_at || it.moderated_at || it.created_at,
  });

  if (status === "approved") {
    const posted = await getList([
      "/stories/posted",
      "/stories/reviewed?status=approved",
    ]);
    return posted.map((x) => mapItem(x, "Approved"));
  }

  if (status === "rejected") {
    const rejected = await getList([
      "/stories?status=deleted",
      "/stories/deleted",
      "/stories/reviewed?status=rejected",
    ]);
    return rejected.map((x) => mapItem(x, "Rejected"));
  }

  const [posted, rejected] = await Promise.all([
    getList(["/stories/posted"]),
    getList(["/stories?status=deleted", "/stories/deleted"]),
  ]);

  const merged = [
    ...posted.map((x) => mapItem(x, "Approved")),
    ...rejected.map((x) => mapItem(x, "Rejected")),
  ];

  const keyOf = (it) => {
    const id = it.id || it.story_id;
    if (id != null) return `id:${id}`;
    const base = String(it.content || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .slice(0, 160);
    return `c:${base}`;
  };

  const tsOf = (it) =>
    new Date(
      it.reviewed_at || it.updated_at || it.moderated_at || it.created_at || 0
    ).getTime();

  const byKey = new Map();
  for (const it of merged) {
    const k = keyOf(it);
    const ts = tsOf(it);
    const cur = byKey.get(k);
    if (!cur || ts > cur._ts) byKey.set(k, { ...it, _ts: ts });
  }

  const deduped = Array.from(byKey.values()).map(({ _ts, ...x }) => x);

  return deduped.sort(
    (a, b) =>
      new Date(a.reviewed_at || a.updated_at || a.moderated_at || a.created_at || 0) <
      new Date(b.reviewed_at || b.updated_at || b.moderated_at || b.created_at || 0)
        ? 1
        : -1
  );
}

/* Public delete by token */
export async function deleteStoryByDeletionToken(deletionToken) {
  const tries = [
    { method: "PUT",  path: "/stories/delete",       body: { deletionToken } },
    { method: "POST", path: "/stories/delete-token", body: { deletionToken } },
    { method: "POST", path: "/stories/delete",       body: { deletionToken } },
  ];

  for (const t of tries) {
    const res = await fetch(`${BASE_URL}${t.path}`, {
      method: t.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t.body),
    });
    if (res.ok) return true;
    if (res.status === 404) continue;
    let msg = `Request to ${t.path} failed (${res.status})`;
    try {
      const json = await res.json();
      msg = json?.payload?.message || json?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  throw new Error("No public delete-by-token endpoint was found (404).");
}

/* Aliases */
export { flagPostedStory as flagStory };
export { deleteStoryById as deleteStoryAsModerator };

/* Feature flags (optional) */
export const FEATURES = {
  hasActiveModeratorsEndpoint:
    String(import.meta.env.VITE_HAS_ACTIVE_MOD_ENDPOINT || "0") === "1",
};

// ---- Review actions (approve/reject) — coba beberapa endpoint yang sudah ada di BE
export async function reviewApproveStory(id, notes = "") {
  const tries = [
    { method: "PUT",  path: `/stories/flagged/${id}/unflag`, body: {} },        // flow queue yg sudah ada
    { method: "PUT",  path: `/stories/${id}/approve`,         body: { notes } }, // alternatif
    { method: "POST", path: `/stories/${id}/approve`,         body: { notes } }, // alternatif
  ];

  for (const t of tries) {
    const res = await fetch(`${BASE_URL}${t.path}`, {
      method: t.method,
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: ["POST","PUT","PATCH"].includes(t.method) ? JSON.stringify(t.body ?? {}) : undefined,
    });
    if (res.ok) return true;
    if (res.status === 404) continue;

    let msg = `Request to ${t.path} failed (${res.status})`;
    try {
      const j = await res.json();
      msg = j?.payload?.message || j?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  throw new Error("No approve endpoint available (404).");
}

export async function reviewRejectStory(id, notes = "") {
  // coba soft-delete (kalau router PUT tersedia)
  try {
    const res = await fetch(`${BASE_URL}/stories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ status: "deleted", isFlagged: false, notes }),
    });
    if (res.ok) return { softDeleted: true };
    if (res.status !== 404) {
      let msg = `Request to /stories/${id} failed (${res.status})`;
      try { const j = await res.json(); msg = j?.payload?.message || j?.message || msg; } catch {}
      throw new Error(msg);
    }
  } catch (e) {
    if (!String(e?.message || "").includes("(404)")) throw e;
  }

  // fallback: hard delete (ini yang pasti ada di BE kamu)
  const del = await fetch(`${BASE_URL}/stories/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader() },
  });
  if (!del.ok) {
    let msg = `DELETE /stories/${id} failed (${del.status})`;
    try { const j = await del.json(); msg = j?.payload?.message || j?.message || msg; } catch {}
    throw new Error(msg);
  }
  return { hardDeleted: true };
}



