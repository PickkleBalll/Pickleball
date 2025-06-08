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
      >
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
          <PrivateRoute adminOnly={true}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="adminDashboard" element={<Admin />} />
        <Route path="adminUser" element={<ContentManagement />} />
        <Route path="adminContent" element={<AnalyticsReporting />} />
        <Route path="adminContent" element={<AnalyticsReporting />} />
      </Route> */}
    </Routes>
  );
}
export default App;
