import React from 'react';

interface PopupContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const PopupContactForm: React.FC<PopupContactFormProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-gradient-to-r from-lime-300 to-lime-100 p-10 rounded-[40px] w-[800px] space-y-6 font-[Poppins] shadow-lg">
                {/* Fullname */}
                <div>
                    <label className="text-[22px] font-normal text-black">Fullname</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full border-b border-black bg-transparent outline-none text-black text-[18px] mt-2"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-[22px] font-normal text-black">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border-b border-black bg-transparent outline-none text-black text-[18px] mt-2"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="text-[22px] font-normal text-black">Message</label>
                    <textarea
                        placeholder="Your message..."
                        className="w-full border-b border-black bg-transparent outline-none text-black text-[18px] h-[36px] resize-none"
                    />

                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-black text-white text-[23px] px-10 py-3 rounded-full hover:opacity-90"
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupContactForm;