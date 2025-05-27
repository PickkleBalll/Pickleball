import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Giả lập xác thực thành công
    localStorage.setItem('auth', 'true');
    navigate('/dashboard');
  };

  return (
    // <div className="sign-in-page min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white shadow-lg rounded-3xl flex max-w-5xl w-full overflow-hidden">
    //     {/* Left: Form */}
    //     <div className="flex-1 p-10 flex flex-col justify-center">
    //       <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>
    //       <form onSubmit={handleLogin} className="space-y-4">
    //         <input
    //           type="text"
    //           placeholder="Username"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           className="w-full px-4 py-3 border border-gray-300 rounder-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    //         />

    //         <input 
    //           type="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 btn-submit"
    //         />

    //         <div className="text-sm text-gray-500">
    //           <a href="#" className="hover:underline">
    //             Forgot Password ?
    //           </a>
    //         </div>

    //         <button
    //            type="submit"
    //            className="w-full py-3 rounder-full text-white font-semibold transition bg-gradient-to-r from-green-300 to-blue-400 hover:opacity-90 rounded-4xl btn-submit"
    //            >
    //             SIGN IN 
    //         </button>
    //         </form>

    //         <div className="mt-6 text-sm text-center text-gray-300">
    //           <a href="#" className="hover:underline">
    //             Create your account →
    //           </a>
    //         </div>
    //       </div>

    //       {/* Right: Image (bo tròn) */}
    //     <div className="hidden md:block flex-1 bg-cover bg-center relative" style={{ backgroundImage: "url(' ')" }}>
    //       <div className="absolute inset-0 bg-black opacity-10 rounded-bl-[80px] rounded-tl-full rounded-br-full"></div>
    //     </div>
    //   </div>
    // </div>

    <div className="sign-in-page flex">
      <div className="w-[30%] p-4 bg-blue-100 flex align-items-center">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounder-full focus:outline-none focus:ring-2 focus:ring-blue-400 input-form"
            />

            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 input-form "
            />

            <div className="text-sm text-gray-500">
              <a href="#" className="hover:underline">
                Forgot Password ?
              </a>
            </div>

            <button
               type="submit"
               className="w-full py-3 rounder-full text-white font-semibold transition bg-gradient-to-r from-green-300 to-blue-400 hover:opacity-90 rounded-4xl btn-submit"
               >
                SIGN IN 
            </button>
            </form>

            <div className="mt-6 text-sm text-center text-gray-300">
              <a href="#" className="hover:underline">
                Create your account →
              </a>
            </div>
          </div>
      </div>
      <div className="w-[70%] p-4 bg-blue-200">Column 2 (70%)
        <div className="hidden md:block flex-1 bg-cover bg-center relative sign-in-background" >
          <div className="absolute inset-0 bg-black opacity-10 rounded-bl-[80px] rounded-tl-full rounded-br-full"></div>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
