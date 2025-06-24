import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imageAvatar from "../../assets/Image/16.jpg";
import PopupCoach from "../../pages/PopupCoach";

const navLinks = ["Learner", "Tutorials", "Profile"];

const HeaderCoach: React.FC = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);

    // Đóng popup khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full bg-[#f5f5f5] border-b border-black relative font-[Roboto] z-50">
            <header className="h-[80px] flex items-center justify-center px-14 relative">
                {/* Logo */}
                <div className="absolute left-14 text-black text-3xl font-['Roboto','IBM_Plex_Mono']">
                    PICKLEBALL
                </div>

                {/* Navigation */}
                <nav className="flex gap-10">
                    {navLinks.map((link, index) => (
                        <div
                            key={index}
                            className="font-normal text-black text-[22px] cursor-pointer hover:text-green-500 transition-colors"
                            onClick={() => {
                                if (link === "Learner") navigate("/coachlearner");
                                else if (link === "Tutorials") navigate("/coachtutorials");
                                else if (link === "Profile") navigate("/coachfinance");
                            }}
                        >
                            {link}
                        </div>
                    ))}
                </nav>

                {/* Avatar + Popup */}
                <div className="absolute right-14 top-[10px]" ref={avatarRef}>
                    {/* Avatar */}
                    <div
                        className="w-[61px] h-[61px] rounded-full overflow-hidden border border-black cursor-pointer"
                        onClick={() => setShowPopup(!showPopup)}
                    >
                        <img
                            src={imageAvatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Popup Coach (hiển thị dưới avatar) */}
                    {showPopup && (
                        <div className="absolute -right-8 mt-4">
                            <PopupCoach />
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default HeaderCoach;
