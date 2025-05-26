import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignInPage';
import SignUp from '../pages/SignUpPage';
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from '../routes/PrivateRoute';
import Home from '../components/Homepage/Homepage';

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
    </Routes>
  );
}

export default App;
