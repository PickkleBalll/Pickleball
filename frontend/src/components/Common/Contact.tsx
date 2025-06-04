import React, { useState } from 'react';
import PopupContactForm from './PopupContactForm';
import Footer from '@/ui/Footer';

const Contact: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className='mt-14'>
      <div className="w-full bg-white py-16 px-[60px] flex items-center justify-between font-['Roboto']">
        <div className="text-3xl leading-tight font-normal text-black">
          HEARD
          <br />
          ENOUGH? →
        </div>

        <div className="text-center mr-96">
          <h2 className="text-[80px] font-semibold text-black leading-none">Contact us</h2>
          <div className="w-[400px] h-[2px] bg-[#EEFF4D] mt-2 mx-auto" />
        </div>

        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-[100px] h-[100px] bg-[#EEFF4D] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          type="button"
        >
          <span className="text-[45px] font-bold text-black leading-[1] flex items-center justify-center">
            →
          </span>
        </button>
      </div>

      {/* Popup form */}
      <PopupContactForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    
        <Footer/>
    </section>
  );
};

export default Contact;
