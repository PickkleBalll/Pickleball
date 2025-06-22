import React from 'react';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const navItems = ['home', 'about', 'features', 'blog'];

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignInClick = () => {
    navigate('/coachhome');
    window.scrollTo(0, 0);
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f5] flex justify-between items-center py-6 px-12 shadow-md font-['Roboto']">
      {/* Logo */}
      <div
        className="text-black text-[30px] font-normal font-['IBM_Plex_Mono'] cursor-pointer"
        onClick={handleLogoClick}
      >
        PICKLEBALL
      </div>

      {/* Navigation (scroll to section in homepage) */}
      <nav className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item}
            to={item}
            spy={true}
            smooth={true}
            offset={-130}
            duration={500}
            activeClass="text-green-500"
            className="text-[22px] text-black font-normal font-['Inter'] cursor-pointer hover:text-green-400 transition-colors duration-200"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Sign In Button */}
      <button
        onClick={handleSignInClick}
        className="w-[120px] h-[40px] bg-[#D5F25D] rounded-[50px] border border-black text-[22px] text-black font-normal font-['Inter'] hover:opacity-90 transition"
      >
        Sign In
      </button>

    </header>
  );
};

export default Header;

