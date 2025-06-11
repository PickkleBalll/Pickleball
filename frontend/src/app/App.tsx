import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignInPage';
import SignUp from '../pages/SignUpPage';
import PrivateRoute from '../routes/PrivateRoute';
import Home from '../components/Homepage/Homepage';
import Dashboard from '../components/Dashboard/Dashboard';
import AdminLayout from '../pages/admin-pages/admin-layout';
import DashboardAdmin from '../pages/admin-pages/dashboard-admin';
import UserManagement from '../pages/admin-pages/user-management';
import ContentManagement from '../pages/admin-pages/content-management';
import Notifications from '../pages/admin-pages/notification';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
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
    </Routes>
  );
}

export default App;
