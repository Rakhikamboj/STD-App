import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import SymptomChecker from "./pages/SymptomChecker";
import EducationHub from "./pages/EducationHub";
import Community from "./pages/Community";
import DoctorAuth from "./pages/DoctorAuth";
import DoctorDashboard from "./pages/DoctorDashboard";
import ResultsScreen from "./pages/ResultsScreen";
import FAQ from "./pages/Faqs.jsx";
import Footer from "./components/Footer.jsx";

const GA_TRACKING_ID = "G-E2Z53DVEZ5";

// This component tracks route changes
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <AnalyticsTracker /> 
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/symptom-result" element={<ResultsScreen />} />
          <Route path="/education" element={<EducationHub />} />
          <Route path="/community" element={<Community />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/doctor/login" element={<DoctorAuth />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
