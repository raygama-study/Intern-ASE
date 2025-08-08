// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPages from "./Pages/LandingPages";
import ShareSection from "./Pages/ShareSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/share" element={<ShareSection />} />
      </Routes>
    </Router>
  );
}

export default App;
