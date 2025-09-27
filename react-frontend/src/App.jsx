// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// LIGHT (sudah ada)
import LandingPages from "./Pages/LandingPages";
import ShareSection from "./Pages/ShareSection";
import ValidationSection from "./Pages/ValidationSection";
import ReportSubmit from "./Pages/ReportSubmit";
import Comment from "./Pages/Comment";

// DARK (baru – pastikan file2 ini ada)
import LandingPagesDark from "./Pages/LandingPagesDark";
import ShareSectionDark from "./Pages/ShareSectionDark";
import ValidationSectionDark from "./Pages/ValidationSectionDark";
import ReportSubmitDark from "./Pages/ReportSubmitDark";
import CommentDark from "./Pages/CommentDark";

// MODERATOR (tetap tanpa dark)
import ModeratorDashboard from "./Pages/Moderator/Dashboard";
import ModeratorQueue from "./Pages/Moderator/Queue";
import Emergency from "./Pages/Moderator/Emergency";
import History from "./Pages/Moderator/History";
import Settings from "./Pages/Moderator/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ===== PUBLIC LIGHT ROUTES ===== */}
        <Route path="/" element={<LandingPages />} />
        <Route path="/share" element={<ShareSection />} />
        <Route path="/validation" element={<ValidationSection />} />
        <Route path="/report-submit" element={<ReportSubmit />} />
        <Route path="/comment" element={<Comment />} />

        {/* ===== PUBLIC DARK ROUTES ===== */}
        <Route path="/dark" element={<LandingPagesDark />} />
        <Route path="/dark/share" element={<ShareSectionDark />} />
        <Route path="/dark/validation" element={<ValidationSectionDark />} />
        <Route path="/dark/report-submit" element={<ReportSubmitDark />} />
        <Route path="/dark/comment" element={<CommentDark />} />

        {/* ===== MODERATOR ===== */}
        <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
        <Route path="/moderator/queue" element={<ModeratorQueue />} />
        <Route path="/moderator/emergency" element={<Emergency />} />
        <Route path="/moderator/history" element={<History />} />
        <Route path="/moderator/settings" element={<Settings />} />

        {/* fallback: redirect ke home light */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
