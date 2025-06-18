import React from "react";
import HeaderCoach from "../components/Common/HeaderCoach";
import image16 from "../assets/Image/16.jpg";

const EditProfile: React.FC = () => {
    const profileData = {
        name: "Selena Arven",
        dob: "12/12/1999",
        gender: "Female",
        email: "arven@gmail.com",
        phone: "01234567910",
        interest: "Pickleball",
    };

    const infoFields = [
        { label: "Fullname", value: profileData.name },
        { label: "Date of birth", value: profileData.dob },
        { label: "Gender", value: profileData.gender },
        { label: "Email", value: profileData.email },
        { label: "Phone number", value: profileData.phone },
        { label: "Interest", value: profileData.interest },
    ];

    return (
        <div className="bg-[#f0f0f0] min-h-screen font-['Roboto'] pb-20">
            <HeaderCoach />

            <div className="max-w-[1000px] mx-auto px-4">
                {/* Avatar và mô tả */}
                <section className="flex items-center gap-12 mt-12 mb-16">
                    <img
                        src={image16}
                        alt="Profile"
                        className="w-[200px] h-[200px] rounded-full object-cover border"
                    />
                    <div className="flex flex-col gap-8">
                        <p className="font-bold text-[#a7a7a7] text-[22px] leading-8">
                            This will be displayed to other users when they view your profile or posts. <br />
                            Max size: 2MB
                        </p>
                        <button className="w-[129px] h-[47px] rounded-[15px] border border-[#727272] bg-[#f0f0f0] font-bold shadow">
                            UPLOAD
                        </button>
                    </div>
                </section>

                {/* Thông tin cơ bản */}
                <h2 className="font-bold text-3xl mb-8 text-center">Basic Information</h2>
                <div className="flex flex-col gap-6">
                    {infoFields.map((field, index) => (
                        <div key={index} className="flex items-center gap-4 py-2">
                            <div className="w-[250px] text-[25px] font-medium">{field.label}</div>
                            <div className="flex-1 text-[25px] font-medium text-[#a7a7a7]">{field.value}</div>
                            <button className="w-[30px] h-[30px] p-0 text-gray-500 hover:text-black">
                                ✎
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
