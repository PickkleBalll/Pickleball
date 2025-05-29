import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-6 px-8 bg-white">
      <div className="text-black text-[30px] font-normal font-['IBM_Plex_Mono'] break-words">PICKLEBALL</div>

      <nav className="flex space-x-6">
        <a href="#" className="text-[22px] text-black font-normal font-['Inter'] break-words hover:underline">Home</a>
        <a href="#" className="text-[22px] text-black font-normal font-['Inter'] break-words hover:underline">About</a>
        <a href="#" className="text-[22px] text-black font-normal font-['Inter'] break-words hover:underline">Features</a>
        <a href="#" className="text-[22px] text-black font-normal font-['Inter'] break-words hover:underline">Blog</a>
      </nav>

      <div className="flex items-center justify-center w-[120px] h-[40px] bg-[#D5F25D] rounded-[50px] border border-black text-[22px] text-black font-normal font-['Inter'] break-words cursor-pointer select-none">
        Sign In
      </div>

    </header>
  );
};

export default Header;
