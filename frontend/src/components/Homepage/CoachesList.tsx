import React from 'react';
import image6 from "../../assets/Image/6.jpg";
import image7 from "../../assets/Image/7.jpg";
import image8 from "../../assets/Image/8.jpg";

export default function CoachesList() {
    return (
        <section className="px-6 py-10 bg-[#f5f5f5] mt-0 font-['Roboto']">
            <h2 className="text-[75px] font-bold mb-8 pl-[60px]">Coaches</h2>
            <div className="flex gap-[38px] mt-[60px] justify-center flex-wrap">
                <img
                    src={image6}
                    alt="Image 6"
                    className="w-[450px] h-[400px] object-cover rounded-xl shadow-md"
                />
                <img
                    src={image7}
                    alt="Image 7"
                    className="w-[450px] h-[400px] object-cover rounded-xl shadow-md"
                />
                <img
                    src={image8}
                    alt="Image 8"
                    className="w-[450px] h-[400px] object-cover rounded-xl shadow-md"
                />
            </div>
        </section>
    );
}