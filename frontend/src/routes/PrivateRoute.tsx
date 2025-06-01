import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuth = localStorage.getItem('auth') === 'true';
  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
