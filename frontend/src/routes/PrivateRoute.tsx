import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement; // dùng React.ReactElement thay vì JSX.Element
}

const PrivateRoute = ({ children }: Props) => {
  const isAuth = localStorage.getItem('auth') === 'true';
  return isAuth ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
