// src/utils/moderation.js
const RX = {
  selfHarm: /\b(suicide|kill myself|end my life|self[-\s]?harm|bunuh diri|mengakhiri hidup|akhiri hidup)\b/i,
  violence: /\b(violence|abuse|assault|rape|pemerkosaan|kekerasan|ancaman|threat|threaten)\b/i,
  sexual:   /\b(porn|porno|sex|seks|xxx|bokep)\b/i,
  profanity:/\b(fuck|shit|bitch|bastard|anjing|bangsat|kampret|kontol|memek)\b/i,
};

export function isUnsafeText(text = "") {
  const s = String(text).toLowerCase().trim();
  if (!s) return { blocked: false, reason: "", tags: [] };

  const tags = [];
  if (RX.selfHarm.test(s)) tags.push("Self-harm");
  if (RX.violence.test(s)) tags.push("Violence/Abuse");
  if (RX.sexual.test(s))   tags.push("Sexual content");
  if (RX.profanity.test(s))tags.push("Profanity");

  const blocked = tags.length > 0;
  const reason = blocked
    ? `Komentar/cerita mengandung konten dilarang: ${tags.join(", ")}.`
    : "";

  return { blocked, reason, tags };
}
