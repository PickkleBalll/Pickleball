import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image5 from "@/assets/Image/5.jpg";
import image11 from "@/assets/Image/11.jpg";
import image12 from "@/assets/Image/12.jpg";

const blogContents = [
    {
        text: `Pickleball is not just a sport; it is a bridge connecting people of all ages, from students to retirees.
        I meet new friends, laugh more, and feel healthier every day.
        The sunny afternoons, the sound of the ball bouncing on the court,
        and the handshakes after each match make me realize: this is what I have been searching for all along – a community, a joy, a motivation for a more positive life.`,
        image: image5,
    },
    {
        text: `Pickleball will change your perspective on physical activity.
        No longer are there heavy workouts or performance pressure; 
        here, there is only joy, smiles, and sharing.
        Every time you step onto the court, you feel rejuvenated – not just from the movement, but from the spirit of connection.`,
        image: image11,
    },
    {
        text: `Pickleball doesn't require you to be really good to play.
        What you need is the courage to step onto the court, the willingness to try, and the ability to laugh when you make mistakes.
        Here, everyone has been a beginner – it's the friendliness and mutual support that makes me want to come back to the court every day.`,
        image: image12,
    },
];

const BlogCard:React.FC = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handlePrev = () => {
        setDirection(-1);
        setIndex((prev) => (prev === 0 ? blogContents.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setDirection(1);
        setIndex((prev) => (prev === blogContents.length - 1 ? 0 : prev + 1));
    };

    return (
        <section id="blog" className="scroll-mt-28 flex justify-center font-['Roboto']">
            <div className="w-[1440px] h-[600px] bg-[#212121] text-white rounded-[50px] overflow-hidden flex px-[40px] py-[40px] relative">

                {/* Left content */}
                <div className="w-1/2 pr-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-[75px] font-bold mb-15">Blog</h1>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                                transition={{ duration: 0.5 }}
                                className="text-[20px] text-justify leading-[1.8] font-['Inter'] max-w-[600px] w-full"
                            >
                                {blogContents[index].text}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Arrows */}
                    <div className="flex justify-center space-x-4 text-6xl pt-6">
                        <span className="cursor-pointer" onClick={handlePrev}>←</span>
                        <span className="cursor-pointer" onClick={handleNext}>→</span>
                    </div>
                </div>

                {/* Right image */}
                <div className="w-1/2 h-full overflow-hidden rounded-tr-[50px] rounded-br-[50px]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={index}
                            src={blogContents[index].image}
                            alt="Blog Visual"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default BlogCard;
