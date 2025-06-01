import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <main className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
