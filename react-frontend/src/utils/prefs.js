// src/utils/prefs.js
const LS_KEY = "vu:prefs";

const DEFAULTS = {
  emergencyAlert: true,
  dailySummary: false,
  soundNotif: false,
  assignMode: "balance", 
  dailyTarget: "50",    
};

function read() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { ...DEFAULTS };
    const obj = JSON.parse(raw);
    return { ...DEFAULTS, ...(obj || {}) };
  } catch {
    return { ...DEFAULTS };
  }
}

function write(next) {
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("vu:prefs_changed", { detail: next }));
}

export const prefs = {
  getAll: () => read(),
  setAll: (v) => write({ ...read(), ...(v || {}) }),

  // toggles
  getEmergencyAlert: () => read().emergencyAlert,
  setEmergencyAlert: (val) => write({ ...read(), emergencyAlert: !!val }),

  getDailySummary: () => read().dailySummary,
  setDailySummary: (val) => write({ ...read(), dailySummary: !!val }),

  getSoundNotif: () => read().soundNotif,
  setSoundNotif: (val) => write({ ...read(), soundNotif: !!val }),

  // selects
  getAssignMode: () => read().assignMode,
  setAssignMode: (mode) => write({ ...read(), assignMode: String(mode || "balance") }),

  getDailyTarget: () => read().dailyTarget,
  setDailyTarget: (v) => write({ ...read(), dailyTarget: String(v || "50") }),
};


export function onPrefsChange(fn) {
  const handler = (e) => fn(e.detail || read());
  window.addEventListener("vu:prefs_changed", handler);
  return () => window.removeEventListener("vu:prefs_changed", handler);
}
