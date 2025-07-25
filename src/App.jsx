import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPages from "./Pages/LandingPages";
import ShareSection from "./Pages/ShareSection";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 space-x-4">
        <Link to="/">Landing Page</Link>
        <Link to="/share">Share Section</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/share" element={<ShareSection />} />
      </Routes>
    </Router>
  );
}

export default App;
