import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Đảm bảo import đúng đường dẫn
import imageAvatar from "../../assets/Image/16.jpg";

const navLinks = ["Learner", "Tutorials", "Profile"];

const HeaderCoach: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth(); // Lấy logout và isAuthenticated
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

  if (!isAuthenticated) {
    return null; // Không hiển thị HeaderCoach nếu chưa đăng nhập
  }

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
                if (link === "Learner") navigate("/coach/learner");
                else if (link === "Tutorials") navigate("/coach/tutorials");
                else if (link === "Profile") navigate("/coach/profile");
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

          {/* Popup (bao gồm Logout) */}
          {showPopup && (
            <div className="absolute -right-8 mt-4 w-48 bg-white rounded-lg shadow-lg border border-black z-50">
              <div
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setShowPopup(false);
                  navigate("/coach/profile"); // Điều hướng đến Profile (hoặc giữ nguyên)
                }}
              >
                Profile
              </div>
              <div
                className="block px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setShowPopup(false);
                  logout(); // Gọi logout từ AuthContext
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default HeaderCoach;