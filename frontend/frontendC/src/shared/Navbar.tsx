import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import userImage from '../assets/Image/user-woman.jpg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  // Menu tùy chỉnh theo vai trò
  const getRoleBasedLinks = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <NavLink
              to="/admin/user-management"
              className={({ isActive }) =>
                `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
              }
            >
              User Management
            </NavLink>
          </>
        );
      case 'coach':
        return (
          <>
            <NavLink
              to="/coach-dashboard"
              className={({ isActive }) =>
                `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
              }
            >
              Coach Dashboard
            </NavLink>
            <NavLink
              to="/coach-tutorials"
              className={({ isActive }) =>
                `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
              }
            >
              Tutorials
            </NavLink>
          </>
        );
      case 'learner':
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <header>
      <div className="flex items-center justify-between w-full py-5 px-8 mb-8 border-b-2 border-[#4D4D4D]/70">
        <div className="text-black text-3xl font-normal">PICKLEBALL</div>
        <nav className="flex space-x-8">{getRoleBasedLinks()}</nav>

        <div className="relative ml-10" ref={menuRef}>
          <img
            src={userImage}
            alt="User Avatar"
            className="w-[45px] h-[45px] rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="px-4 py-2 text-gray-700 border-b border-gray-200">
                {user?.fullname || 'User'}
              </div>
              <NavLink
                to="/profile"
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                onClick={() => {
                  setIsOpen(false);
                  logout();
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