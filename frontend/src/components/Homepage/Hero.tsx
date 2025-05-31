import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/Image/1.jpg";
import image2 from "../../assets/Image/2.jpg";
import image4 from "../../assets/Image/4.jpg";

const Hero: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section id="home" className="scroll-mt-28 pt-25 flex justify-center bg-[#f5f5f5] font-['Roboto']">
            <div className="relative w-[1440px] h-[800px] bg-[#212121] rounded-[50px] px-[60px] pt-[40px] pb-[40px] text-white font-['Roboto'] overflow-hidden mx-auto">
                {/* Tiêu đề 1 - Train smarter */}
                <div className="absolute top-[95px] left-[60px] text-[75px] font-bold text-[#D5F25D] leading-none">
                    Train smarter
                </div>

                {/* Tiêu đề 2 - Play better */}
                <div className="absolute top-[190px] left-[237px] text-[75px] font-bold text-[#D5F25D] leading-none">
                    Play better
                </div>

                {/* Nút Join */}
                <div
                    onClick={() => navigate("/signup")}
                    className="absolute top-[215px] left-[701px] w-[88px] h-[43px] flex items-center justify-center rounded-[50px] border border-[#D5F25D] text-[#D5F25D] text-[20px] cursor-pointer hover:bg-[#D5F25D] hover:text-[#212121] transition"
                >
                    Join
                </div>

                {/* Mô tả */}
                <div className="absolute top-[363px] left-[60px] w-[542px] text-[24px] text-justify leading-[1.5]">
                    Connect with top pickleball coaches anytime, anywhere. Our AI-powered app
                    analyzes your gameplay, gives real-time feedback, and creates personalized
                    training plans. Upload videos, track your progress, and improve faster with
                    smart insights — all in one seamless platform.
                </div>

                {/* Ảnh 1 */}
                <img
                    src={image1}
                    alt="Image 1"
                    className="absolute top-[322px] left-[700px] w-[333px] h-[444px] rounded-[20px] object-cover"
                />

                {/* Ảnh 2 */}
                <img
                    src={image2}
                    alt="Image 2"
                    className="absolute top-[60px] left-[1070px] w-[333px] h-[444px] rounded-[20px] object-cover"
                />

                {/* Ảnh 4 */}
                <img
                    src={image4}
                    alt="Image 4"
                    className="absolute top-[555px] left-[1070px] w-[333px] h-[210px] rounded-[20px] object-cover"
                />
            </div>
        </section>
    );
};

export default Hero;
