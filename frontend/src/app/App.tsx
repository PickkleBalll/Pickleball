import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import CoursesPage from "../pages/CoursesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/courses" element={<CoursesPage />} />
    </Routes>
  );
}
