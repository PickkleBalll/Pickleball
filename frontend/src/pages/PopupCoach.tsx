import React from "react";

const PopupCoach: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f5] min-h-screen font-['Roboto']">
            <div className="w-[320px] bg-white border border-black rounded-[20px] shadow-lg p-6 space-y-6">
                <p className="text-[22px] text-black cursor-pointer hover:underline text-center">Notifications</p>
                <p className="text-[22px] text-black cursor-pointer hover:underline text-center">Become a coach</p>
                <p className="text-[22px] text-black cursor-pointer hover:underline text-center">Sign Out</p>
            </div>
        </div>
    );
};

export default PopupCoach;
