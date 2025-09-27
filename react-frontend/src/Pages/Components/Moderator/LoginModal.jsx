// src/Pages/Components/Moderator/LoginModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";
import { loginModerator } from "../../../utils/api";

import moderator from "/src/assets/images/user-admin.png";
import user from "/src/assets/images/bx_user1.png";
import userErr from "/src/assets/images/bx_user.png";
import pass from "/src/assets/images/password1.png";
import passErr from "/src/assets/images/password.png";

export default function LoginModal({ open, onClose, onLogin, theme = "light" }) {
  const dialogRef = useRef(null);
  const [showPwd, setShowPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Palet warna per tema
  const palette =
    theme === "dark"
      ? {
          backdrop: "rgba(0,0,0,0.65)",
          panelBg: "#2B2521",
          surfaceBg: "#3A312C",
          heading: "#EEE3D9",
          text: "#EEE3D9",
          hint: "#EEE3D9B3",
          shadow: "0 16px 44px rgba(0,0,0,.55)",
        }
      : {
          backdrop: "rgba(0,0,0,0.30)",
          panelBg: "#F4EBDC",
          surfaceBg: "#FFFFFF",
          heading: "#1e1e1e",
          text: "#1e1e1e",
          hint: "#6b7280",
          shadow: "0px 10px 28px rgba(0,0,0,0.20)",
        };

  // Border state classes
  const baseLine =
    theme === "dark"
      ? "border-b border-[#B36B1C]/40 focus-within:border-[#C65C33] focus-within:shadow-[0_0_8px_rgba(198,92,51,.45)]"
      : "border-b border-[#E6E0DA] focus-within:border-[#C65C33] focus-within:shadow-[0_0_8px_rgba(198,92,51,.35)]";

  const errorLine =
    theme === "dark"
      ? "border-b border-red-400 shadow-[0_0_10px_rgba(248,113,113,.55)]"
      : "border-b border-red-500 shadow-[0_0_10px_rgba(255,59,48,.55)]";

  // Input base styles
  const inputBase =
    "w-full py-3 outline-none font-abhaya text-[16px] bg-transparent caret-[#C65C33]";
  const inputTone =
    theme === "dark"
      ? "text-[#EEE3D9] placeholder-[#EEE3D9]/55"
      : "text-[#1e1e1e] placeholder-[#1e1e1e]/55";

  async function handleSubmit(e) {
    e?.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const { token, user: userData } = await loginModerator({
        username,
        password,
      });

      // Persist
      localStorage.setItem("vu:token", token);
      localStorage.setItem("vu:user", JSON.stringify(userData));
      localStorage.setItem("vu:username", userData?.username || username);

      onLogin?.({ token, user: userData });
      onClose?.();
    } catch (err) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  // Lock scroll + auto focus on open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // fokus ke panel
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => open && e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isError = Boolean(error);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="moderator-login-title"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{ background: palette.backdrop }}
      />

      {/* Panel wrapper */}
      <div
        className="relative h-full w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-10">
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="rounded-2xl outline-none"
            style={{ background: palette.panelBg, boxShadow: palette.shadow }}
          >
            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pt-10 pb-8" style={{ color: palette.text }}>
              {/* Icon */}
              <img
                src={moderator}
                alt=""
                aria-hidden="true"
                className="w-12 h-12 mx-auto mb-4 select-none pointer-events-none"
                style={{ opacity: 0.95 }}
              />

              <h2
                id="moderator-login-title"
                className="text-center font-aboreto text-[28px] md:text-[32px] tracking-wide mb-6"
                style={{ color: palette.heading }}
              >
                MODERATOR LOGIN
              </h2>

              {/* Card surface */}
              <div
                className="rounded-[14px] p-6"
                style={{ background: palette.surfaceBg }}
              >
                {/* Username */}
                <label className="block">
                  <span className="sr-only">Username</span>
                  <div
                    className={`flex items-center gap-3 transition ${isError ? errorLine : baseLine}`}
                  >
                    <img
                      src={isError ? userErr : user}
                      alt=""
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className={`${inputBase} ${inputTone}`}
                      aria-invalid={isError}
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="username"
                      inputMode="text"
                    />
                  </div>
                </label>

                {/* Password */}
                <label className="block mt-5">
                  <span className="sr-only">Password</span>
                  <div
                    className={`flex items-center gap-3 transition ${isError ? errorLine : baseLine}`}
                  >
                    <img
                      src={isError ? passErr : pass}
                      alt=""
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type={showPwd ? "text" : "password"}
                      className={`${inputBase} ${inputTone}`}
                      aria-invalid={isError}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="p-1 hover:opacity-90"
                      style={{ color: palette.hint }}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </label>

                {/* Error area */}
                {isError ? (
                  <p
                    className="text-[15px] mt-4"
                    style={{ color: theme === "dark" ? "#fca5a5" : "#dc2626" }}
                  >
                    {error}
                  </p>
                ) : (
                  <div className="mt-4" />
                )}

                {/* Submit */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="min-w-[120px] h-[44px] rounded-[10px] px-6 font-abhaya text-white hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "#C65C33",
                      boxShadow: "0 8px 22px rgba(198,92,51,0.35)",
                    }}
                  >
                    {loading ? "Signing in…" : "Login"}
                  </button>
                </div>
              </div>

              {/* Cancel */}
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="underline font-abhaya hover:opacity-90"
                  style={{ color: "#C65C33" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onLogin: PropTypes.func,
  theme: PropTypes.oneOf(["light", "dark"]),
};
