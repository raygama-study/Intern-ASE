import React, { useEffect, useRef, useState } from "react";
import { UserRound, KeyRound, Eye, EyeOff } from "lucide-react";
import moderator from "/src/assets/images/moderator.png";

export default function LoginModal({ open, onClose, onLogin }) {
  const dialogRef = useRef(null);
  const [showPwd, setShowPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3030/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      console.log(json);
      const ok = json?.payload?.statusCode === 200;
      if (!ok) throw new Error(json?.payload?.message || "Login failed");

      const token = json?.payload?.datas?.token;
      const user = json?.payload?.datas?.user;
      if (!token) throw new Error("Token missing in response");

      // store safely (do NOT store password)
      localStorage.setItem("vu:token", token);
      localStorage.setItem("vu:user", JSON.stringify(user));
      localStorage.setItem("vu:username", user?.username || username);

      onLogin?.({ token, user });   // let parent route to dashboard, etc.
      onClose?.();
    } catch (err) {
      setError(err.message || "Network error");
    }
  };

  // lock scroll + focus saat modal dibuka
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC untuk close
  useEffect(() => {
    const onKey = (e) => open && e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="moderator-login-title"
      onClick={onClose}
    >
      {/* Backdrop blur + dim */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30" />

      {/* Wrapper agar bisa scroll kalau layar kecil */}
      <div
        className="relative h-full w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-10">
          {/* Kartu utama */}
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="rounded-2xl bg-background shadow-xl outline-none"
            style={{ boxShadow: "0px 10px 28px rgba(0,0,0,0.20)" }}
          >
            <div className="px-8 pt-10 pb-8">
              {/* Ikon di atas judul */}
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

              {/* Card form putih */}
              <div className="bg-white rounded-[14px] border border-[#E6E0DA] shadow-[0_6px_16px_rgba(0,0,0,0.08)] p-6">
                {/* Username */}
                <label className="block">
                  <span className="sr-only">Username</span>
                  <div className="flex items-center gap-3 border-b border-[#E6E0DA] focus-within:border-[#C65C33] transition">
                    <UserRound className="w-5 h-5 text-[#C8BEB5]" />
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full py-3 outline-none font-abhaya text-[16px] bg-transparent"
                    />
                  </div>
                </label>

                {/* Password */}
                <label className="block mt-5">
                  <span className="sr-only">Password</span>
                  <div className="flex items-center gap-3 border-b border-[#E6E0DA] focus-within:border-[#C65C33] transition">
                    <KeyRound className="w-5 h-5 text-[#C8BEB5]" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type={showPwd ? "text" : "password"}
                      className="w-full py-3 outline-none font-abhaya text-[16px] bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="p-1 text-[#C8BEB5] hover:text-[#9c9289]"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </label>

                {/* Tombol Login */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="min-w-[120px] h-[44px] rounded-[10px] bg-[#C65C33] text-white px-6
                               shadow-[0_8px_22px_rgba(198,92,51,0.28)] hover:opacity-95 font-abhaya"
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Cancel kecil */}
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[#C65C33] underline font-abhaya"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
