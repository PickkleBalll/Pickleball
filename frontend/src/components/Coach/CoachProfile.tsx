import React from "react";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "lucide-react";
import image16 from "../../assets/Image/16.jpg";
import image6 from "../../assets/Image/6.jpg";
import image7 from "../../assets/Image/7.jpg";
import image3 from "../../assets/Image/3.jpg";

// Profile data
const profileData = [
    { label: "Coaching Niche", value: "Sport Coach" },
    { label: "Certifications", value: "None" },
    { label: "Skills Level", value: "1" },
    { label: "Interest", value: "Pickleball" },
    { label: "Nationality", value: "British" },
];

// Tutorials
const tutorials = [
    { type: "VIDEO", image: image6 },
    { type: "PDF", image: image7 },
    { type: "CLASS", image: image3 },
];

const CoachProfile: React.FC = () => {
    const navigate = useNavigate(); // 👉 Thêm để điều hướng

    return (
        <div className="min-h-screen w-full bg-[#f0f0f0] font-['Roboto']">
            {/* Page Content */}
            <div className="px-6 py-10 flex flex-col gap-12">
                {/* Profile Section */}
                <section className="flex flex-col md:flex-row gap-10 font-[Roboto]">
                    {/* Avatar Card */}
                    <div className="bg-white shadow-md rounded-[50px] w-full md:w-[450px] ml-auto md:ml-[60px]">
                        <div className="flex flex-col items-center justify-center p-8">
                            <div className="w-[250px] h-[250px] rounded-full overflow-hidden border border-black">
                                <img
                                    src={image16}
                                    alt="Gloria Bromley"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-6 text-[22px] font-semibold">GLORIA BROMLEY</div>
                            <div className="mt-2 text-[22px] font-light text-[#727272]">Gender: Male</div>
                        </div>
                    </div>

                    {/* Profile Info Card */}
                    <div className="bg-white shadow-md rounded-[50px] w-full md:w-[800px] relative ml-auto md:ml-[70px]">
                        <div className="p-6 pb-0">
                            <h2 className="text-3xl font-bold">PROFILE</h2>
                            <EditIcon
                                className="absolute top-7 right-7 w-8 h-8 cursor-pointer"
                                onClick={() => navigate('/editprofile')}
                            />
                        </div>
                        <div className="bg-gray-300 h-[1px] w-full" />
                        <div className="p-6 space-y-6">
                            {profileData.map((item) => (
                                <div key={item.label} className="text-2xl text-[#727272]">
                                    {item.label}: {item.value}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Me */}
                <section>
                    <div className="bg-white shadow-md rounded-[50px] max-w-[1400px] mx-auto px-6">
                        <div className="p-6">
                            <h2 className="text-[40px] font-semibold">About me</h2>
                        </div>
                        <div className="p-6 pt-0">
                            <p className="text-[25px] text-black leading-relaxed">
                                Hi! I'm Gloria, a passionate Pickleball instructor dedicated to helping players
                                of all levels improve their game and enjoy the sport. With years of coaching
                                experience, I focus on creating a fun, supportive, and engaging learning environment.
                                I believe Pickleball is not just a sport - it's a great way to stay active, build
                                community, and have fun at any age.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tutorials */}
                <section>
                    <div className="bg-white shadow-md rounded-[50px] max-w-[1400px] mx-auto px-6 pt-4 pb-10 min-h-[600px]">
                        <div className="pt-0 pb-8 px-6">
                            <h2 className="text-[40px] font-semibold">Tutorials</h2>
                        </div>

                        {/* Tutorials grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                            {tutorials.map((item) => (
                                <div key={item.type} className="flex flex-col items-center">
                                    <div className="w-full h-[380px] overflow-hidden rounded-[30px] border border-black">
                                        <img
                                            src={item.image}
                                            alt={item.type}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-4 text-[30px] font-semibold text-center">
                                        {item.type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Activities */}
                <section>
                    <div className="bg-white shadow-md rounded-[50px] max-w-[1400px] mx-auto px-6 pt-2 pb-10">
                        <div className="pt-0 pb-6 px-6">
                            <h3 className="text-[40px] font-semibold">Activities</h3>
                        </div>
                        <div className="text-center text-[25px] text-[#c8c7c5] font-medium">
                            No record
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CoachProfile;
