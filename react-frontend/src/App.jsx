// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPages from "./Pages/LandingPages";
import ShareSection from "./Pages/ShareSection";
import ValidationSection from "./Pages/ValidationSection";
import ReportSubmit from "./Pages/ReportSubmit";
import Comment from "./Pages/Comment";
// MODERATOR
import ModeratorDashboard from "./Pages/Moderator/Dashboard";
import ModeratorQueue from "./Pages/Moderator/Queue";
import Emergency from "./Pages/Moderator/Emergency";
import History from "./Pages/Moderator/History";
import Settings from "./Pages/Moderator/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/share" element={<ShareSection />} />
        <Route path="/validation" element={<ValidationSection />} />
        <Route path="/report-submit" element={<ReportSubmit />} />
        <Route path="/comment" element={<Comment />} />
        {/* Moderator */}
        <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
        <Route path="/moderator/queue" element={<ModeratorQueue />} />
        <Route path="/moderator/emergency" element={<Emergency />} />
        <Route path="/moderator/history" element={<History />} />
        <Route path="/moderator/settings" element={<Settings/>} />

      </Routes>
    </Router>
  );
}
