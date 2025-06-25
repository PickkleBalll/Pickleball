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
import EditLearnerProfile from '@/components/Dashboard/EditProfile';
import Payment from '@/components/Dashboard/Learner/Payment';
import Package from '@/components/Dashboard/Learner/Package';
import AdminLayout from '../pages/admin-pages/admin-layout';
import DashboardAdmin from '../pages/admin-pages/dashboard-admin';
import UserManagement from '../pages/admin-pages/user-management';
import ContentManagement from '../pages/admin-pages/content-management';
import Notifications from '../pages/admin-pages/notification';
import CoachLayout from '../layouts/CoachLayout';
import CoachFinance from '../pages/CoachFinance';
import CoachLearner from '../pages/CoachLearner';
import CoachProfile from '../pages/CoachProfile';
import CoachTutorials from '../pages/CoachTutorials';
import PopupCoach from '../pages/PopupCoach';
import ContactLearner from '../components/Common/ContactLearner';
import EditProfile from '../pages/EditProfile';

function Unauthorized() {
  return <h2>Unauthorized: You don't have permission to access this page.</h2>;
}

function App() {
  return (
    <Routes>
      {/* Public - Home page */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} /> {/* Trang mặc định khi vào root */}
        <Route path="/courses" element={<CoursesPage />} />
      </Route>

      {/* Auth-only layout */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Unauthorized route */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Learner routes */}
      <Route
        element={
          <PrivateRoute allowedRoles={['learner']}>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<LearnerHome />} />
        <Route path="/coach" element={<LearnerCoach />} />
        <Route path="/learn" element={<LearnerLearn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/package" element={<Package />} />
        <Route path="/profile" element={<LearnerProfile />} />
        <Route path="/edit-learner-profile" element={<EditLearnerProfile />} />
      </Route>

      {/* Admin routes */}
      <Route
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="/admin">
          <Route index element={<DashboardAdmin />} /> {/* Trang mặc định khi vào /admin */}
          <Route path="dashboard-admin" element={<DashboardAdmin />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="content-management" element={<ContentManagement />} />
          <Route path="notification" element={<Notifications />} />
        </Route>
      </Route>

      {/* Coach routes */}
      <Route
        element={
          <PrivateRoute allowedRoles={['coach']}>
            <CoachLayout />
          </PrivateRoute>
        }
      >
        <Route path="/coach">
          <Route index element={<CoachLearner />} />
          <Route path="finance" element={<CoachFinance />} />
          <Route path="learner" element={<CoachLearner />} />
          <Route path="profile" element={<CoachProfile />} />
          <Route path="tutorials" element={<CoachTutorials />} />
          <Route path="popup" element={<PopupCoach />} />
          <Route path="contactLearner" element={<ContactLearner />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;