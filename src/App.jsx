import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import EmergencyBar from "@/components/EmergencyBar";
import HomePage from "@/pages/HomePage"; // or Home.jsx
import SymptomAnalyzer from "@/pages/SymptomAnalyzer"; // or SymptomAnalyzer.jsx
import SymptomChecker from "@/pages/SymptomChecker"; // or SymptomChecker.jsx
import Diseases from "@/pages/Diseases"; // or Diseases.jsx

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/symptom-analyzer" element={<SymptomAnalyzer />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/diseases" element={<Diseases />} />
      </Routes>
      <EmergencyBar />
    </BrowserRouter>
  );
}
