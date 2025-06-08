import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      <main className="w-full max-w-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
