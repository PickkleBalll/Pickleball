import React from 'react';
import image1 from '../../assets/Image/1.jpg';
import image2 from '../../assets/Image/2.jpg';
import image4 from '../../assets/Image/4.jpg';

const Hero = () => {
    return (
        <section className="bg-[#212121] px-6 py-10 text-white">
            <h1 className="font-extrabold font-['Inter'] text-[#D5F25D] leading-tight">
                <span className="text-[80px] block pl-8">Train smarter</span>
                <span className="text-[75px] block pl-52">Play better</span>
            </h1>

            <div className="inline-block mt-6 px-6 py-2 rounded-[50px] border border-[#D5F25D] text-[#D5F25D] font-normal font-['Inter'] text-[20px] cursor-pointer select-none">
                Join
            </div>

            <div className="mt-8 max-w-4xl text-white text-[30px] font-normal font-['Inter'] break-words text-justify flex flex-col justify-center">
                Connect with top pickleball coaches anytime, anywhere. Our AI-powered app
                analyzes your gameplay, gives real-time feedback, and creates personalized
                training plans. Upload videos, track your progress, and improve faster with
                smart insights — all in one seamless platform.
            </div>

            {/* Thêm div bao ngoài ảnh */}
            <div
                style={{
                    width: "1360px",
                    height: "800px",
                    background: "#212121",
                    borderRadius: "50px",
                    marginTop: "40px", // để tạo khoảng cách với nội dung trên
                    padding: "20px",    // thêm padding để ảnh không dính sát viền
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <img
                        src={image1}
                        alt="Image 1"
                        style={{ width: "333px", height: "444px", borderRadius: 20, objectFit: "cover" }}
                    />
                    <img
                        src={image2}
                        alt="Image 2"
                        style={{ width: "333px", height: "444px", borderRadius: 20, objectFit: "cover" }}
                    />
                    <img
                        src={image4}
                        alt="Image 4"
                        style={{ width: "312px", height: "175px", borderRadius: 20, objectFit: "cover" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
