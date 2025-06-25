import React from "react";

const financeData = [
    { label: "Total", value: "182", color: "#E06668" },
    { label: "Content", value: "182", color: "#E0A366" },
    { label: "Package", value: "182", color: "#668BE0" },
    { label: "Payment", value: "182", color: "#E06668" },
    { label: "Class", value: "182", color: "#E0A366" },
    { label: "Package", value: "182", color: "#668BE0" },
];

const CoachFinance: React.FC = () => {
    return (
        <div className="bg-[#f5f5f5] min-h-screen font-['Roboto']">
            <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-20 mt-[150px]">
                    {financeData.map((item, index) => (
                        <div
                            key={index}
                            className="relative w-[200px] h-[80px] bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-end items-end pr-4 pb-4"
                        >
                            {/* Màu khối vuông đè lên */}
                            <div
                                className="absolute -top-5 left-5 w-[70px] h-[70px] rounded-[5px]"
                                style={{ backgroundColor: item.color }}
                            ></div>

                            {/* Nội dung */}
                            <div className="text-right mr-2 ">
                                <p className="text-[18px] text-[#CEC2C2] font-light">{item.label}</p>
                                <p className="text-[20px] text-black font-light">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoachFinance;
