import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from '../components/Common/Contact';
import image13 from "../assets/Image/13.jpg";
import image14 from "../assets/Image/14.jpg";
import image15 from "../assets/Image/15.jpg";

const courses = [
    {
        title: "KID COURSES",
        price: "50$",
        image: image13,
    },
    {
        title: "BASIC COURSES",
        price: "120$",
        image: image14,
    },
    {
        title: "ADVANCED COURSES",
        price: "250$",
        image: image15,
    },
];

export default function CoursesPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="bg-[#f6f6f6] min-h-screen font-['Roboto']">
            {/* Header */}
            <header className="p-6 flex justify-between items-center">
                <div className="text-black text-[30px] font-normal break-words">
                    PICKLEBALL
                </div>
                <div
                    onClick={() => navigate('/signin')}
                    className="flex items-center justify-center w-[120px] h-[40px] bg-[#D5F25D] rounded-[50px] border border-black text-[22px] text-black font-normal break-words cursor-pointer select-none hover:opacity-90 transition"
                >
                    Sign In
                </div>
            </header>

            {/* Title */}
            <section className="mx-10 mb-20">
                <div className="w-full h-[300px] bg-black flex items-center justify-center rounded-[60px]">
                    <h2 className="font-bold text-[#D5F25D] text-[80px]">
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
                                <h3 className="font-bold text-black text-[50px]">
                                    {course.title}
                                </h3>
                            </div>

                            <div className="flex flex-row items-center justify-center gap-50 w-[618px]">
                                <span className="font-bold text-black text-[50px]">
                                    {course.price}
                                </span>
                                <button className="w-[143px] h-[70px] rounded-[50px] border border-black text-black text-2xl font-normal hover:bg-black hover:text-white transition">
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contact Section */}
            <Contact />
        </div>
    );
}
