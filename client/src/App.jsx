import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SymptomChecker from './pages/SymptomChecker';
import EducationHub from './pages/EducationHub';
import Community from './pages/Community';
import DoctorAuth from './pages/DoctorAuth';
import DoctorDashboard from './pages/DoctorDashboard';
import ResultsScreen from './pages/ResultsScreen';
// import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/symptom-result" element={<ResultsScreen />} />
          
          <Route path="/education" element={<EducationHub />} />
          <Route path="/community" element={<Community />} />
          <Route path="/doctor/login" element={<DoctorAuth />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
