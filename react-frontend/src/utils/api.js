// src/utils/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3030";

// ===== helpers =====
function authHeader() {
  const token = localStorage.getItem("vu:token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res, path) {
  let json;
  try {
    json = await res.json();
  } catch {
    // ignore
  }
  if (!res.ok) {
    const msg =
      json?.payload?.message ||
      json?.message ||
      `Request to ${path} failed (${res.status})`;
    throw new Error(msg);
  }
  return json?.payload?.datas ?? json;
}

// ===== generic HTTP =====
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

// ===== auth =====
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

// ===== public stories =====
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
    headers: { ...authHeader() }, // biasanya tidak perlu auth
    body: fd,
  });
  return handle(res, "/stories");
}

// ===== moderator stories =====
export async function fetchHeldStories() {
  return apiGet("/stories/held"); // butuh auth; header dihandle di apiGet
}

// SINGLE definition only (hapus yang lain!)
export async function updateStoryStatus(storyId, status) {
  // Sesuaikan dengan validator BE kamu (minimal ada content & categoryIds)
  const body =
    typeof status === "object"
      ? status
      : { content: "moderation-update", categoryIds: [], status };

  return apiPut(`/stories/${storyId}/edit`, body);
}

export async function escalateStory(id) {
  return updateStoryStatus(id, "emergency");
}

// ===== optional helpers =====
export async function fetchEmergencyStories() {
  // Coba endpoint paling umum; kalau 404, kembalikan []
  try {
    const res = await apiGet("/stories?status=emergency");
    return Array.isArray(res) ? res : res?.items ?? [];
  } catch (e) {
    if (String(e?.message || "").includes("(404)")) return [];
    throw e;
  }
}

// ===== helper kecil untuk coba beberapa endpoint sampai ada yang berhasil =====
async function tryGetOne(paths) {
  for (const p of paths) {
    try {
      const data = await apiGet(p);
      return Array.isArray(data) ? data : (data?.items ?? []);
    } catch (e) {
      // kalau 404, lanjut coba path berikutnya
      if (String(e?.message || "").includes("(404)")) continue;
      // kalau error lain, lempar
      throw e;
    }
  }
  return [];
}

// ===== reviewed stories (history) =====
// filter: { status: 'all' | 'approved' | 'rejected' }
export async function fetchReviewedStories(filter = {}) {
  const status = filter.status ?? "all";

  const mapItem = (it, forcedStatus) => ({
    ...it,
    status: forcedStatus, // "Approved" | "Rejected"
    reviewed_at: it.updated_at || it.moderated_at || it.created_at,
  });

  if (status === "approved") {
    const posted = await tryGetOne([
      "/stories/reviewed?status=approved",
      "/stories/posted",
    ]);
    return posted.map((x) => mapItem(x, "Approved"));
  }

  if (status === "rejected") {
    const rejected = await tryGetOne([
      "/stories/reviewed?status=rejected",
      "/stories/deleted",
      "/stories?status=deleted",
    ]);
    return rejected.map((x) => mapItem(x, "Rejected"));
  }

  // 'all' → gabungkan approved + rejected dan urutkan terbaru
  const [posted, rejected] = await Promise.all([
    tryGetOne([
      "/stories/reviewed?status=approved",
      "/stories/posted",
    ]),
    tryGetOne([
      "/stories/reviewed?status=rejected",
      "/stories/deleted",
      "/stories?status=deleted",
    ]),
  ]);

  const merged = [
    ...posted.map((x) => mapItem(x, "Approved")),
    ...rejected.map((x) => mapItem(x, "Rejected")),
  ];

  return merged.sort(
    (a, b) => new Date(b.reviewed_at || 0) - new Date(a.reviewed_at || 0)
  );
}
