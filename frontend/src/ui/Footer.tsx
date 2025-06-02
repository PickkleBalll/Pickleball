import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#040B1C] text-white py-16 px-12 mt-10">
      <div className="grid grid-cols-2 ">
        <p className="text-6xl underline decoration-[#EEFF4D]">PICKLEBALL</p>
        <div className="flex space-x-4 pt-8">
          <p>HOME</p>
          <p>MEMBERSHIPS</p>
          <p>TOURNAMENTS</p>
          <p>ABOUT US</p>
          <p>FOLLOW US</p>
        </div>
        <div className="space-x-2">
          <FontAwesomeIcon icon={faFacebook} style={{ color: '#ffffff' }} />
          <FontAwesomeIcon icon={faInstagram} style={{ color: '#ffffff' }} />
        </div>
      </div>
      <div className="mt-5 text-xs">
        <p>© 2021 All Rights Reserved</p>
      </div>
      <div className="bg-brand text-white">Nền màu brand chính</div>
    </footer>
  );
};

export default Footer;
