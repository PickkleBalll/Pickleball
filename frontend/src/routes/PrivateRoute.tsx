import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // nếu đã set up

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth(); // dùng context
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};
export default PrivateRoute;