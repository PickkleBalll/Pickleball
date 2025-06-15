import React from "react";
import HeaderCoach from "../components/Common/HeaderLearner";

const CoachHome: React.FC = () => {
    return (
        <div className="bg-[#f0f0f0] min-h-screen font-['Roboto']">
            {/* Header */}
            <HeaderCoach />

            {/* Thanh tìm kiếm */}
            <div className="flex justify-center mt-9 mb-12">
                <input
                    type="text"
                    placeholder="Find Learner"
                    className="w-[800px] h-[38px] pl-4 rounded-[20px] border border-black shadow"
                />
            </div>
        </div>
    );
};

export default CoachHome;
