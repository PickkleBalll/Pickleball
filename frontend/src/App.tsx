import { Routes, Route } from 'react-router-dom';
import SignIn from '../src/pages/SignInPage';
import SignUp from '../src/pages/SignUpPage';
import Home from '../src/pages/Homepage';
import CoursesPage from '../src/pages/CoursesPage';
import PrivateRoute from '../src/layouts/PrivateRoute';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import PublicLayout from '@/layouts/PublicLayout';
import LearnerHome from '@/components/Learner/LearnerHome';
import LearnerProfile from '@/components/Learner/LearnerProfile';
import LearnerCoach from '@/components/Learner/LearnerCoach';
import LearnerLearn from '@/components/Learner/LearnerLearn';
import EditLearnerProfile from '@/components/EditProfile';
import Payment from '@/components/Learner/Payment';
import Package from '@/components/Learner/Package';
import AdminLayout from '../src/layouts/AdminLayout';
import DashboardAdmin from '../src/components/Admin/dashboard-admin';
import UserManagement from '../src/components/Admin/user-management';
import ContentManagement from '../src/components/Admin/content-management';
import CoachLayout from '../src/layouts/CoachLayout';
import CoachLearner from '../src/components/Coach/CoachLearner';
import CoachProfile from '../src/components/Coach/CoachProfile';
import CoachTutorials from '../src/components/Coach/CoachTutorials';
import PopupCoach from '../src/components/Coach/PopupCoach';
import ContactLearner from './components/Common/ContactLearner';
import EditCoachProfile from './components/Coach/EditProfile';
import LearnerHomeVip from './components/Learner/Premium/LearnerHomeVIP';

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
        <Route path="/learnerCoach" element={<LearnerCoach />} />
        <Route path="/learn" element={<LearnerLearn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/package" element={<Package />} />
        <Route path="/profile" element={<LearnerProfile />} />
        <Route path="/edit-learner-profile" element={<EditLearnerProfile />} />
        <Route path="/learnerHomeVip" element={<LearnerHomeVip/>}/>
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
          <Route index element={<DashboardAdmin />} />
          <Route path="dashboard-admin" element={<DashboardAdmin />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="content-management" element={<ContentManagement />} />
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
          <Route path="learner" element={<CoachLearner />} />
          <Route path="profile" element={<CoachProfile />} />
          <Route path="tutorials" element={<CoachTutorials />} />
          <Route path="popup" element={<PopupCoach />} />
          <Route path="contactLearner" element={<ContactLearner />} />
          <Route path="edit-coach-profile" element={<EditCoachProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
