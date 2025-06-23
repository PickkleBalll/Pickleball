import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import CoursesPage from "../pages/CoursesPage";
import CoachLearner from "../pages/CoachLearner";
import EditProfile from "../pages/EditProfile";
import CoachProfile from "../pages/CoachProfile";
import CoachTutorials from "../pages/CoachTutorials";
import PopupCoach from "../pages/PopupCoach";
import ContactLearner from "../components/Common/ContactLearner";
import CoachFinance from "../pages/CoachFinance";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/coachfinance" element={<CoachFinance />} />
      <Route path="/coachlearner" element={<CoachLearner />} />
      <Route path="/contactlearner" element={<ContactLearner />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/coachprofile" element={<CoachProfile />} />
      <Route path="/coachtutorials" element={<CoachTutorials />} />
      <Route path="/popupcoach" element={<PopupCoach />} />
    </Routes>
  );
}
