import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import CoursesPage from "../pages/CoursesPage";
import CoachProfile from "../pages/CoachProfile";
import CoachLearner from "../pages/CoachLearner";
import ContactLearner from "../components/Common/ContactLearner";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/coach" element={<CoachProfile />} />
      <Route path="/coachlearner" element={<CoachLearner />} />
      <Route path="/contactlearner" element={<ContactLearner />} />
    </Routes>
  );
}
