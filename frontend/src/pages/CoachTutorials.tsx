import React from "react";
import HeaderCoach from "../components/Common/HeaderCoach";
import image17 from "../assets/Image/17.jpg";

const tutorialSections = [
    {
        title: "Video",
        items: [
            "Lessons or personalized drills designed by the coach",
            "Technical analysis videos, common mistakes, and how to fix them",
            "Lessons organized by skill level",
        ],
    },
    {
        title: "PDF",
        items: [
            "PDFs, technical illustrations, or strategy breakdowns",
            "Recommendations for equipment or skills to focus on",
        ],
    },
    {
        title: "Progress Tracking",
        items: ["History of completed lessons"],
    },
];

const Tutorials: React.FC = () => {
    return (
        <>
            <HeaderCoach />
            <div className="bg-[#f0f0f0] min-h-screen w-full font-['Roboto'] flex flex-col items-center pt-24 gap-20 px-6">
                <div className="relative w-full max-w-[1100px]">
                    <div className="bg-black text-white rounded-[40px] px-10 py-6 pt-10 pl-[300px] mx-auto max-w-[800px] mr-[50px]">
                        {tutorialSections.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h3 className="text-[25px] font-bold text-[#ececec]">
                                    {section.title}
                                </h3>
                                <ul className="ml-6 pl-2">
                                    {section.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-[15px] font-bold text-[#ececec] my-1"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Learner card đè lên trái bo đen */}
                    <div className="absolute left-[70px] top-1/2 -translate-y-1/2 z-10 ">
                        <div className="bg-white w-[360px] h-[230px] rounded-[40px] shadow-md relative flex items-center px-6">
                            {/* Avatar */}
                            <img
                                src={image17}
                                alt="Selena Arven"
                                className="w-[100px] h-[100px] rounded-full object-cover border border-black mr-6 mt-[-60px]"
                            />

                            {/* Nội dung bên phải */}
                            <div className="flex flex-col justify-center">
                                <h3 className="text-[20px] font-extrabold text-black">SELENA ARVEN</h3>
                                <p className="text-[16px] font-light text-[#b6b6b6]  mt-1 ml-14">Level 1</p>
                                <p className="text-[16px] font-light text-[#b6b6b6] mt-0 ml-14">British</p>

                                <button
                                    className="mt-8 w-[180px] h-[38px] bg-[#d5f25d] hover:bg-[#c5e24d] rounded-[40px] border border-black text-black font-extrabold text-[15px] tracking-wide"
                                >
                                    CONTACT LEARNER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Tracking section */}
                <div className="w-full max-w-[1100px] mx-auto bg-white rounded-[50px] px-8 py-10 mb-20 relative">
                    <h2 className="text-[28px] font-bold mb-6">Progress Tracking</h2>
                    <div className="relative flex items-center justify-between gap-6">

                        <button className="absolute left-0 top-1/2 -translate-y-1/2 text-black text-[36px] font-extrabold z-10">
                            ←
                        </button>

                        {/* Khối nội dung */}
                        <div className="flex justify-between gap-6 w-full px-12">
                            <div className="w-1/3 h-[250px] bg-[#f0f0f0] rounded-[15px]"></div>
                            <div className="w-1/3 h-[250px] bg-[#f0f0f0] rounded-[15px]"></div>
                            <div className="w-1/3 h-[250px] bg-[#f0f0f0] rounded-[15px]"></div>
                        </div>

                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-black text-[36px] font-extrabold z-10">
                            →
                        </button>
                    </div>
                </div>

            </div >
        </>
    );
};

export default Tutorials;
