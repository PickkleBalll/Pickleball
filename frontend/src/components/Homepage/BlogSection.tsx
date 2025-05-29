import React from "react";
import image5 from "../../assets/Image/5.jpg";

const BlogCard = () => {
    return (
        <section className="flex justify-center py-10 bg-[#f5f5f5]">
            <div className="w-[1440px] h-[600px] bg-[#212121] text-white rounded-[50px] overflow-hidden flex px-[40px] py-[40px] relative">
                {/* Left content */}
                <div className="w-1/2 pr-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-5xl font-bold mb-6">Blog</h1>
                        <p className="text-[20px] text-justify leading-[1.8] font-['Inter']">
                            Pickleball is not just a sport; it is a bridge connecting people of all ages, from students to retirees.
                            I meet new friends, laugh more, and feel healthier every day.
                            The sunny afternoons, the sound of the ball bouncing on the court, and the handshakes after each match make me realize: this is what I have been searching
                            for all along – a community, a joy, a motivation for a more positive life.
                        </p>
                    </div>

                    {/* Arrows */}
                    <div className="flex justify-center space-x-4 text-6xl pt-6">
                        <span className="cursor-pointer">←</span>
                        <span className="cursor-pointer">→</span>
                    </div>
                </div>

                {/* Right image */}
                <div className="w-1/2 h-full relative">
                    <img
                        src={image5}
                        alt="Image 5"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-tr-[50px] rounded-br-[50px]"
                    />
                </div>


            </div>
        </section>
    );
};

export default BlogCard;
