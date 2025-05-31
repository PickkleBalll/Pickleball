import React, { useState } from 'react';
import PopupContactForm from '../../pages/PopupContactForm';

const Contact: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            {/* Contact Section */}
            <section className="w-full bg-white py-16 px-[60px] flex items-center justify-between">
                {/* Left text */}
                <div className="text-[45px] leading-tight font-normal text-black">
                    HEARD<br />ENOUGH? →
                </div>

                {/* Center title */}
                <div className="text-center">
                    <h2 className="text-[80px] font-semibold text-black leading-none">
                        Contact us
                    </h2>
                    <div className="w-[400px] h-[2px] bg-[#EEFF4D] mt-2 mx-auto" />
                </div>

                {/* Right circular button */}
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="w-[100px] h-[100px] bg-[#EEFF4D] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    type="button"
                >
                    <span className="text-[45px] font-bold text-black leading-[1] flex items-center justify-center">→</span>
                </button>
            </section>

            {/* Popup form */}
            <PopupContactForm
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
};

export default Contact;
