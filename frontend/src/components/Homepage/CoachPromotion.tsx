import React from "react";
import image10 from "../../assets/Image/10.jpg";

export default function CoachPromotion() {
    return (
        <section id="features" className="flex justify-center pt-[10px] pb-0 bg-[#f5f5f5]">
            <div className="w-[2024px] px-[40px] py-[5px] overflow-hidden relative">
                {/* Ảnh */}
                <img
                    src={image10}
                    alt="Image 10"
                    className="w-full h-auto rounded-[30px] object-cover"
                />
            </div>
        </section>
    );
}
