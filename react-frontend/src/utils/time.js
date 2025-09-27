// src/utils/time.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function fromNow(dateStr) {
  if (!dateStr) return "";
  return dayjs(dateStr).fromNow();
}

export function formatDate(dateStr, fmt = "YYYY-MM-DD HH:mm") {
  if (!dateStr) return "";
  return dayjs(dateStr).format(fmt);
}
