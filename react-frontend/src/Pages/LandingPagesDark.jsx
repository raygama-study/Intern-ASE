import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDark from "./Components/LandingPagesDark/HeaderDark";
import MainDark from "./Components/LandingPagesDark/MainDark";
import FooterDark from "./Components/LandingPagesDark/FooterDark";
import LoginModal from "./Components/Moderator/LoginModal";

export default function LandingPagesDark() {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);
  const handleLoggedIn = useCallback(() => {
    setLoginOpen(false);
    navigate("/moderator/dashboard");
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#2B2521] text-[#EEE3D9]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <HeaderDark
          onOpenLogin={openLogin}
          onToggleTheme={() => navigate("/")}
          onQuickExit={() => navigate("/")}
        />

        <MainDark
          onShare={() => navigate("/dark/share")}
          onReadStories={() => navigate("/dark/comment")}
        />

        <FooterDark />
      </div>

      <LoginModal
        open={loginOpen}
        onClose={closeLogin}
        onLogin={handleLoggedIn}
        theme="dark"
      />
    </div>
  );
}
