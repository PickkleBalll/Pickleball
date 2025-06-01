import React from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/Image/user-woman.jpg';

const Navbar: React.FC = () => {
  return (
    <header>
      <div className="flex items-center justify-between w-full pt-4 pb-4 px-8 border-b-2 border-[#4D4D4D]">
        <div className="text-black text-3xl font-normal">PICKLEBALL</div>
        <nav className="flex space-x-8">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#D5F25D]' : 'text-black'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/coach"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#D5F25D]' : 'text-black'}`
            }
          >
            Coach
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#D5F25D]' : 'text-black'}`
            }
          >
            Learn
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#D5F25D]' : 'text-black'}`
            }
          >
            Profile
          </NavLink>
        </nav>

        <img className="w-[45px] h-[45px] rounded-full" alt="User Avatar" src={user} />
      </div>
    </header>
  );
};

export default Navbar;
