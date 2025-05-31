import React from "react";
import { Link } from "react-router-dom";
import image3 from "../../assets/Image/3.jpg";
import image9 from "../../assets/Image/9.jpg";

export default function Courses() {
    return (
        <section id="about" className="flex justify-center py-20 bg-gray-100 font-['Roboto']">
            <div className="w-[1440px] h-[800px] bg-white rounded-[50px] px-[60px] py-[50px] flex gap-[60px] items-start relative overflow-hidden">

                {/* Left: Text Content */}
                <div className="w-[600px] z-10">
                    <h2 className="text-[60px] font-bold text-black font-['Inter'] leading-none mb-6">
                        Our Courses
                    </h2>

                    <p className="text-[20px] leading-[1.8] text-black font-['Inter'] text-justify">
                        Pickleball courses are designed for players of all ages and skill levels to
                        learn, improve, and enjoy the game. Whether you're a complete beginner or
                        looking to compete in tournaments, our structured classes help you build skills
                        step-by-step. You’ll master everything from basic serves and footwork to
                        advanced strategies and game tactics. Each course is led by certified coaches
                        who focus on technique, consistency, and fun. We also offer private lessons,
                        youth programs, and video-assisted feedback to help you grow faster. With a
                        friendly and inclusive learning environment, you’ll feel confident on the court
                        in no time. Join us to experience one of the fastest-growing sports in the
                        world!
                    </p>

                    <Link to="/courses">
                        <button className="mt-10 w-[181px] h-[40px] bg-white text-black border border-black text-xl font-normal rounded-full">
                            View all courses
                        </button>
                    </Link>
                </div>

                {/* Right: Images */}
                <div className="relative w-[700px] h-[600px] z-10">
                    {/* Hình lớn */}
                    <img
                        src={image3}
                        alt="Image 3"
                        className="w-[330px] h-[480px] object-cover rounded-[20px] shadow-lg absolute top-10 left-[100px]"
                    />

                    {/* Hình nhỏ đè lên */}
                    <img
                        src={image9}
                        alt="Image 9"
                        className="w-[360px] h-[360px] object-cover rounded-[20px] shadow-xl absolute top-[300px] left-[350px]"
                    />
                </div>
            </div>
        </section>
    );
}
