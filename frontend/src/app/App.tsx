import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import CoursesPage from "../pages/CoursesPage";
import CoachProfile from "../pages/CoachProfile";
import CoachLearner from "../pages/CoachLearner";
import EditProfile from "../pages/EditProfile";
import CoachTutorials from "../pages/CoachTutorials";
import CoachHome from "../pages/CoachHome";
import ContactLearner from "../components/Common/ContactLearner";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/coach" element={<CoachProfile />} />
      <Route path="/coachlearner" element={<CoachLearner />} />
      <Route path="/contactlearner" element={<ContactLearner />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/coachtutorials" element={<CoachTutorials />} />
      <Route path="/coachhome" element={<CoachHome />} />
    </Routes>
  );
}
