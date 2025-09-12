import React, { useEffect, useRef, useState } from "react";
import { UserRound, KeyRound, Eye, EyeOff } from "lucide-react";
import moderator from "/src/assets/images/user-admin.png";
import user from "/src/assets/images/bx_user1.png";
import userErr from "/src/assets/images/bx_user.png";
import pass from "/src/assets/images/password1.png";
import passErr from "/src/assets/images/password.png";


export default function LoginModal({ open, onClose, onLogin }) {
  const dialogRef = useRef(null);
  const [showPwd, setShowPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3030/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      const ok = json?.payload?.statusCode === 200;
      if (!ok) throw new Error(json?.payload?.message || "Invalid username or password");

      const token = json?.payload?.datas?.token;
      const user  = json?.payload?.datas?.user;
      if (!token) throw new Error("Token missing in response");

      localStorage.setItem("vu:token", token);
      localStorage.setItem("vu:user", JSON.stringify(user));
      localStorage.setItem("vu:username", user?.username || username);

      onLogin?.({ token, user });
      onClose?.();
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  // lock scroll + focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => open && e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isError = Boolean(error);
  const errorLine =
    "border-red-500 shadow-[0_0_10px_rgba(255,59,48,.55)]"; // glow merah
  const baseLine =
    "border-[#E6E0DA] focus-within:border-[#C65C33] focus-within:shadow-[0_0_8px_rgba(198,92,51,.35)]";
  const iconError =
    "text-red-500 drop-shadow-[0_0_6px_rgba(255,59,48,.5)]";
  const iconBase = "text-[#C8BEB5]";

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="moderator-login-title"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30" />

      <div
        className="relative h-full w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-10">
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="rounded-2xl bg-background shadow-xl outline-none"
            style={{ boxShadow: "0px 10px 28px rgba(0,0,0,0.20)" }}
          >
            <form onSubmit={handleSubmit} className="px-8 pt-10 pb-8">
              {/* ikon header */}
              <img
                src={moderator}
                alt=""
                aria-hidden="true"
                className="w-12 h-12 mx-auto mb-4 select-none pointer-events-none"
              />

              <h2
                id="moderator-login-title"
                className="text-center font-aboreto text-[28px] md:text-[32px] mb-6"
              >
                MODERATOR LOGIN
              </h2>

              {/* kartu form */}
              <div className="bg-white rounded-[14px] p-6">
                {/* Username */}
                <label className="block">
                  <span className="sr-only">Username</span>
                  <div
                    className={`flex items-center gap-3 border-b transition ${isError ? errorLine : baseLine}`}
                  >
                   <img src={isError ? userErr : user} alt="" className="w-5 h-5" />
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full py-3 outline-none font-abhaya text-[16px] bg-transparent"
                      aria-invalid={isError}
                    />
                  </div>
                </label>

                {/* Password */}
                <label className="block mt-5">
                  <span className="sr-only">Password</span>
                  <div
                    className={`flex items-center gap-3 border-b transition ${isError ? errorLine : baseLine}`}
                  >
                    <img src={isError ? passErr : pass} alt="" className="w-5 h-5" />

                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type={showPwd ? "text" : "password"}
                      className="w-full py-3 outline-none font-abhaya text-[16px] bg-transparent"
                      aria-invalid={isError}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className={`p-1 ${isError ? "text-red-500" : "text-[#C8BEB5]"} hover:opacity-80`}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </label>

                {/* Error message */}
                {isError ? (
                  <p className="text-[15px] mt-4 text-red-600">
                    Enter your username and password correctly.
                  </p>
                ) : (
                  <div className="mt-4" />
                )}

                {/* Tombol Login */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="min-w-[120px] h-[44px] rounded-[10px] bg-[#C65C33] text-white px-6
                               shadow-[0_8px_22px_rgba(198,92,51,0.28)] hover:opacity-95 font-abhaya
                               disabled:opacity-60 disabled:cursor-not-allowed"
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
                  className="text-[#C65C33] underline font-abhaya"
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
