import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignInPage';
import SignUp from '../pages/SignUpPage';
import Home from '../pages/Homepage';
import CoursesPage from '../pages/CoursesPage';
import PrivateRoute from '../layouts/PrivateRoute';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import PublicLayout from '@/layouts/PublicLayout';
import LearnerHome from '@/components/Dashboard/Learner/LearnerHome';
import LearnerProfile from '@/components/Dashboard/Learner/LearnerProfile';
import LearnerCoach from '@/components/Dashboard/Learner/LearnerCoach';
import LearnerLearn from '@/components/Dashboard/Learner/LearnerLearn';
import EditProfile from '@/components/Dashboard/EditProfile';
import Payment from '@/components/Dashboard/Learner/Payment';
import Package from '@/components/Dashboard/Learner/Package';
// import AdminLayout from '@/layouts/AdminLayout';
// import AdminLayout from '../pages/admin-pages/admin-layout';
// import UserManagement from '../pages/admin-pages/user-management';
// import ContentManagement from '../pages/admin-pages/content-management';
// import AnalyticsReporting from '../pages/admin-pages/analytics-reporting';
import PrivateRoute from '../routes/PrivateRoute';
import Home from '../components/Homepage/Homepage';
import Dashboard from '../components/Dashboard/Dashboard';
import AdminLayout from '../pages/admin-pages/admin-layout';
import DashboardAdmin from '../pages/admin-pages/dashboard-admin';
import UserManagement from '../pages/admin-pages/user-management';
import ContentManagement from '../pages/admin-pages/content-management';
import Notifications from '../pages/admin-pages/notification';


function App() {
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
      {/* Public - Home page */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Route>

      {/* Auth-only layout */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Main layout (has navbar, footer) */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      />
      {/* Parent Route */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Children Routes */}
          <Route path="dashboard-admin" element={<DashboardAdmin/>} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="content-management" element={<ContentManagement />} />
          <Route path="notification" element={<Notifications/>} />
        </Route>
    
        <Route path="/dashboard" element={<LearnerHome />} />
        <Route path="/coach" element={<LearnerCoach />} />
        <Route path="/learn" element={<LearnerLearn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/package" element={<Package />} />
        <Route path="/profile" element={<LearnerProfile />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Route>

      {/* <Route
        path="/admin"
        element={
          <PrivateRoute adinOnly={true}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="adminDashboard" element={<Admin />} />
        <Route path="adminUser" element={<ContentManagement />} />
        <Route path="adminContent" element={<AnalyticsReporting />} />
        <Route path="adminContent" element={<AnalyticsReporting />} />
      </Route> */}
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
export default App;
