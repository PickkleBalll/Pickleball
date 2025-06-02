import React from 'react';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const navItems = ['home', 'about', 'features', 'blog'];

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-[#f5f5f5] flex justify-between items-center py-6 px-12 shadow-md font-['Roboto']">
      <div className="text-black text-[30px] font-normal font-['IBM_Plex_Mono'] break-words">
        PICKLEBALL
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item}
            to={item}
            spy={true}
            smooth={true}
            offset={-130}
            duration={50}
            activeClass="text-[#212121]"
            className="text-xl text-[#727272] font-normal font-['Inter'] break-words cursor-pointer hover:text-[#212121] transition-colors duration-200"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Sign In Button */}
      <div
        onClick={() => navigate('/signin')}
        className="flex items-center justify-center w-[120px] h-[40px] bg-[#D5F25D] rounded-[50px] border text-xl text-black font-normal break-words cursor-pointer select-none hover:bg-black hover:text-white transition"
      >
        Sign In
      </div>
    </header>
  );
};

export default Header;
