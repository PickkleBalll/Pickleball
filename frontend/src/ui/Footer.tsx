import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040B1C] text-white py-10 px-12">
      <div className="grid grid-cols-2 ">
        <p className="text-6xl border-b-2 border-[#EEFF4D] w-[335px]">PICKLEBALL</p>
        <div className="flex space-x-4 pt-8">
          <p className='hover:text-[#EEFF4D] cursor-pointer'>HOME</p>
          <p className='hover:text-[#EEFF4D] cursor-pointer'>MEMBERSHIPS</p>
          <p className='hover:text-[#EEFF4D] cursor-pointer'>TOURNAMENTS</p>
          <p className='hover:text-[#EEFF4D] cursor-pointer'>ABOUT US</p>
          <p className='hover:text-[#EEFF4D] cursor-pointer'>FOLLOW US</p>
        </div>

        <div className="flex ml-[1120px] space-x-2 ">
          <FontAwesomeIcon icon={faFacebook} style={{ color: '#ffffff', width: '' }} />
          <FontAwesomeIcon icon={faInstagram} style={{ color: '#ffffff' }} />
        </div>
      </div>

      <div className="text-xs">
        <p>© 2021 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
