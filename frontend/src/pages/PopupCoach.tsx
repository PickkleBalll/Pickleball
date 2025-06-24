import React from "react";
import { useNavigate } from "react-router-dom";

const PopupCoach: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-black rounded-xl shadow-lg p-4 w-[200px] z-50">
            <p
                className="text-[18px] text-black cursor-pointer hover:underline text-center"
                onClick={() => navigate('/editprofile')}
            >
                Profile
            </p>
            <p className="text-[18px] text-black cursor-pointer hover:underline text-center mt-2">
                Log Out
            </p>
        </div>
    );
};

export default PopupCoach;
