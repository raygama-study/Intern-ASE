// src/Pages/LandingPages.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/LandingPages/Header";
import Main from "./Components/LandingPages/Main";
import Footer from "./Components/LandingPages/Footer";
import LoginModal from "./Components/Moderator/LoginModal";

export default function LandingPages() {
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-darkText">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <Header
          onOpenLogin={() => setOpenLogin(true)}
          onToggleTheme={() => navigate("/dark")}
        />
        <Main onShare={() => navigate("/share")} onReadStories={() => navigate("/comment")} />
        <Footer />
      </div>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onLogin={() => {
          setOpenLogin(false);
          navigate("/moderator/dashboard");
        }}
        theme="light"
      />
    </div>
  );
}
