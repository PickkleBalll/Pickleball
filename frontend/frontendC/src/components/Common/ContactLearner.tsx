import React from "react";
import image17 from "../../assets/Image/17.jpg";

const ContactLearner: React.FC = () => {
    return (
        <div className="bg-[#f0f0f0] min-h-screen font-['Roboto'] pb-20">
            {/* Nút Contact Learner */}
            <div className="py-10">
            </div>

            {/* Card thông tin */}
            <div className="max-w-[700px] mx-auto bg-white rounded-[20px] border shadow-md p-10 flex flex-col gap-8">
                {/* Avatar + tên + level */}
                <div className="flex items-center gap-6">
                    <img
                        src={image17}
                        alt="Gloria Bromley"
                        className="ml-6 w-[160px] h-[160px] rounded-full object-cover border-2"
                    />
                    <div className="flex flex-col justify-center pl-28">
                        <h2 className="text-[28px] font-extrabold text-black leading-tight">SELENA ARVEN</h2>
                        <p className="text-[#B6B6B6] font-semibold text-[24px] mt-1 text-center">Level 1</p>
                    </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="grid grid-cols-2 gap-y-5 text-[24px] px-4 pl-10">
                    <div className="text-[#B6B6B6] font-semibold">Nationality</div>
                    <div className="text-[#B6B6B6] font-semibold">British</div>

                    <div className="text-[#B6B6B6] font-semibold">Email</div>
                    <div className="text-[#B6B6B6] font-semibold">gloria@gmail.com</div>

                    <div className="text-[#B6B6B6] font-semibold">Phone number</div>
                    <div className="text-[#B6B6B6] font-semibold">0123456789</div>
                </div>
            </div>
        </div>
    );
};

export default ContactLearner;
