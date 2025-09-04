import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/LandingPages/Header";
import Main from "./Components/LandingPages/main";
import Footer from "./Components/LandingPages/Footer";
import LoginModal from "./Components/Moderator/LoginModal";

export default function LandingPages() {
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative bg-background text-darkText overflow-hidden">
      <div className="max-w-[1440px] min-h-screen mx-auto px-4 md:px-8">
        <Header onOpenLogin={() => setOpenLogin(true)} />
        <Main />
        <Footer />
      </div>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onLogin={(u, p) => {
          setOpenLogin(false);
          navigate("/moderator/dashboard");   // <— penting!
        }}
      />
    </div>
  );
}
