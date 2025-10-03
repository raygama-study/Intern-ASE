const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3030";

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

export async function fetchHeldStories() {
  return apiGet("/stories/flagged");
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
  try {
    const res = await apiGet("/stories?status=emergency");
    return Array.isArray(res) ? res : res?.items ?? [];
  } catch (e) {
    if (String(e?.message || "").includes("(404)")) return [];
    throw e;
  }
}

async function tryGetOne(paths) {
  for (const p of paths) {
    try {
      const data = await apiGet(p);
      return Array.isArray(data) ? data : (data?.items ?? []);
    } catch (e) {
      if (String(e?.message || "").includes("(404)")) continue;
      throw e;
    }
  }
  return [];
}

// reviewed stories (history) 
export async function fetchReviewedStories(filter = {}) {
  const status = filter.status ?? "all";

  const mapItem = (it, forcedStatus) => ({
    ...it,
    status: forcedStatus, 
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

// DELETE STORY BY TOKEN (public)
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

// ALIAS supaya kompatibel dgn komponen lama 
export { flagPostedStory as flagStory };
export { deleteStoryById as deleteStoryAsModerator };
