import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignInPage';
import SignUp from '../pages/SignUpPage';
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from '../routes/PrivateRoute';
import Home from '../components/Homepage/Homepage';
import AdminLayout from '../pages/admin-pages/admin-layout';
import UserManagement from '../pages/admin-pages/user-management';
import ContentManagement from '../pages/admin-pages/content-management';
import AnalyticsReporting from '../pages/admin-pages/analytics-reporting';

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
          <Route path="user-management" element={<UserManagement />} />
          <Route path="content-management" element={<ContentManagement />} />
          <Route path="analytics-reporting" element={<AnalyticsReporting />} />
        </Route>
    </Routes>
  );
}

export default App;
