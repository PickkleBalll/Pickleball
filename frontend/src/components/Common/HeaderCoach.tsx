import React from "react";
import { useNavigate } from "react-router-dom";
import imageAvatar from "../../assets/Image/16.jpg";

const navLinks = ["Home", "Learner", "Tutorials", "Profile"];

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#f5f5f5] border-b border-black relative font-[Roboto]">
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
                                if (link === "Home") {
                                    navigate("/coachhome");
                                } else if (link === "Learner") {
                                    navigate("/coachlearner");
                                } else if (link === "Tutorials") {
                                    navigate("/coachtutorials");
                                } else if (link === "Profile") {
                                    navigate("/editprofile");
                                }
                            }}
                        >
                            {link}
                        </div>
                    ))}
                </nav>

                {/* Avatar */}
                <div
                    className="absolute right-14 cursor-pointer"
                    onClick={() => navigate('/popupcoach')}
                >
                    <div className="w-[61px] h-[61px] rounded-full overflow-hidden border border-black">
                        <img
                            src={imageAvatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header >
        </div >
    );
};

export default Header;
