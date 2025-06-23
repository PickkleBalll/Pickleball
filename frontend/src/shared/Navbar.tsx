import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import user from '../assets/Image/user-woman.jpg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <header>
      <div className="flex items-center justify-between w-full py-5 px-8 mb-8 border-b-2 border-[#4D4D4D]/70">
        <div className="text-black text-3xl font-normal">PICKLEBALL</div>
        <nav className="flex space-x-8">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/coach"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
            }
          >
            Coach
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
            }
          >
            Learn
          </NavLink>
          <NavLink
            to="/package"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
            }
          >
            Package
          </NavLink>
        </nav>

        {/* Avatar + Popup */}
         <div className="relative ml-10" ref={menuRef}>
          <img
            src={user}
            alt="User Avatar"
            className="w-[45px] h-[45px] rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <NavLink
                to="/profile"
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
