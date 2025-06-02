import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignInPage';
import SignUp from '../pages/SignUpPage';
import Home from '../pages/Homepage';
import CoursesPage from '../pages/CoursesPage';
import PrivateRoute from '../routes/PrivateRoute';
import AdminLayout from '../pages/admin-pages/admin-layout';
import UserManagement from '../pages/admin-pages/user-management';
import ContentManagement from '../pages/admin-pages/content-management';
import AnalyticsReporting from '../pages/admin-pages/analytics-reporting';
import MainLayout from '@/routes/MainLayout';
import AuthLayout from '@/routes/AuthLayout';
import PublicLayout from '@/routes/PublicLayout';
import LearnerHome from '@/components/Dashboard/Learner/LearnerHome';
import LearnerProfile from '@/components/Dashboard/Learner/LearnerProfile';
import LearnerCoach from '@/components/Dashboard/Learner/LearnerCoach';
import LearnerLearn from '@/components/Dashboard/Learner/LearnerLearn';
import EditProfile from '@/components/EditProfile';

function App() {
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
        <Route path="user-management" element={<UserManagement />} />
        <Route path="content-management" element={<ContentManagement />} />
        <Route path="analytics-reporting" element={<AnalyticsReporting />} />
      </Route>
      <Route path="/dashboard" element={<LearnerHome />} />
      <Route path="/coach" element={<LearnerCoach />} />
      <Route path="/learn" element={<LearnerLearn />} />
      <Route path="/profile" element={<LearnerProfile />} />
      <Route path="/editProfile" element={<EditProfile />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App;
