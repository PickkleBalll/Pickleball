import React from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/Image/user-woman.jpg';

const Navbar: React.FC = () => {
  return (
    <header>
      <div className="flex items-center space-x-[350px] w-full py-5 px-8 mb-8 border-b-2 border-[#4D4D4D]">
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
            to="/profile"
            className={({ isActive }) =>
              `text-xl font-normal ${isActive ? 'text-[#212121]' : 'text-[#727272]'}`
            }
          >
            Profile
          </NavLink>
        </nav>

        <img className="w-[45px] h-[45px] ml-20 rounded-full cursor-pointer" alt="User Avatar" src={user} />
      </div>
    </header>
  );
};

export default Navbar;
