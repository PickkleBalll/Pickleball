import React, { useEffect } from "react";
import image13 from "../assets/Image/13.jpg";
import image14 from "../assets/Image/14.jpg";
import image15 from "../assets/Image/15.jpg";

const courses = [
    {
        title: "KID COURSES",
        price: "0.99$",
        image: image13,
    },
    {
        title: "BASIC COURSES",
        price: "0.99$",
        image: image14,
    },
    {
        title: "ADVANCED COURSES",
        price: "0.99$",
        image: image15,
    },
];

export default function CoursesPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="bg-[#f6f6f6] min-h-screen font-['Inter']">
            {/* Header */}
            <header className="p-6 flex justify-between items-center">
                <div className="text-black text-[30px] font-normal font-['IBM_Plex_Mono'] break-words">
                    PICKLEBALL
                </div>
                <div className="flex items-center justify-center w-[120px] h-[40px] bg-[#D5F25D] rounded-[50px] border border-black text-[22px] text-black font-normal font-['Inter'] break-words cursor-pointer select-none">
                    Sign In
                </div>
            </header>

            {/* Title */}
            <section className="mx-10 mb-20">
                <div className="w-full h-[300px] bg-black flex items-center justify-center rounded-[60px]">
                    <h2 className="font-['Inter',Helvetica] font-bold text-[#D5F25D] text-[80px]">
                        OUR COURSES
                    </h2>
                </div>
            </section>

            {/* Courses List */}
            <div className="flex flex-col gap-24 px-10 mb-24 items-center">
                {courses.map((course, idx) => (
                    <div key={idx} className="flex flex-row gap-32 items-center max-w-[1200px] w-full">
                        <img
                            src={course.image}
                            alt={`${course.title} image`}
                            className="w-[400px] h-[400px] object-cover rounded-xl"
                        />

                        <div className="flex flex-col gap-8">
                            <div className="w-[618px] h-[129px] bg-white rounded-[50px] border border-black flex items-center justify-center">
                                <h3 className="font-['Inter',Helvetica] font-bold text-black text-[50px]">
                                    {course.title}
                                </h3>
                            </div>

                            <div className="flex flex-row items-center justify-center gap-24 w-[618px]">
                                <span className="font-['Inter',Helvetica] font-bold text-black text-[50px]">
                                    {course.price}
                                </span>
                                <button className="w-[143px] h-[70px] rounded-[50px] border border-black font-['Roboto',Helvetica] text-black text-2xl hover:bg-black hover:text-white transition">
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
                    className="w-[100px] h-[100px] bg-[#EEFF4D] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    type="button"
                >
                    <span className="text-[45px] font-bold text-black leading-[1] flex items-center justify-center">→</span>
                </button>
            </section>
        </div>
    );
}
