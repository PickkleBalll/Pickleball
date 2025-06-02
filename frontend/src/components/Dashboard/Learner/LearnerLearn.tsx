import React from 'react';
import user from '../../../assets/Image/user-woman.jpg';

const LearnerLearn: React.FC = () => {
  return (
    <section className="bg-[#f0f0f0] pb-12">
      <div className="bg-[#f0f0f0] flex flex-row justify-center w-full">
        <div className="bg-[#f0f0f0] w-[1440px] h-[1024px] relative">
          <div className="absolute w-[933px] h-[269px] top-40 left-[255px]">
            <div className="absolute w-[769px] h-[269px] top-0 left-[164px] bg-black rounded-[40px]" />
            <div className="absolute w-[328px] h-[194px] top-11 left-0 bg-white rounded-[40px]" />
            <div className="absolute top-[121px] left-[205px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#b6b6b6] text-[13px] tracking-[0] leading-[normal] whitespace-nowrap">
              Level 2
            </div>
            <div className="absolute top-36 left-[205px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#b6b6b6] text-[13px] tracking-[0] leading-[normal] whitespace-nowrap">
              British
            </div>
            <div className="absolute w-[153px] h-[29px] top-[196px] left-[87px] bg-[#d5f25d] rounded-[40px] border border-solid border-black" />
            <div className="absolute top-[200px] left-[103px] [font-family:'Roboto-Bold',Helvetica] font-bold text-black text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              CONTACT COACH
            </div>
            <img
              className="w-[100px] h-[100px] top-[65px] left-[26px] absolute object-cover"
              alt="Ellipse"
              src={user}
            />
            <div className="absolute top-[92px] left-[151px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal] whitespace-nowrap">
              GLORIA BROMLEY
            </div>
            <div className="absolute top-3.5 left-[368px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
              Video
            </div>
            <div className="absolute top-[114px] left-[368px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
              PDF
            </div>
            <p className="absolute top-[46px] left-[392px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              Lessons or personalized drills designed by the coach
            </p>
            <p className="absolute top-[68px] left-[392px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              Technical analysis videos, common mistakes, and how to fix them
            </p>
            <p className="absolute top-[89px] left-[392px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              Lessons organized by skill level
            </p>
            <p className="absolute top-[146px] left-[392px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              PDFs, technical illustrations, or strategy breakdowns
            </p>
            <p className="absolute top-[168px] left-[392px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              Recommendations for equipment or skills to focus on
            </p>
            <div className="absolute top-[231px] left-[392px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
              History of completed lessons
            </div>
            <div className="absolute top-[195px] left-[368px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
              Progress Tracking
            </div>
          </div>
          
          <div className="absolute w-[949px] h-[293px] top-[490px] left-[259px] bg-white rounded-[50px]">
            <div className="absolute w-[137px] h-10 top-[11px] left-[19px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[33px] text-center tracking-[0] leading-[normal]">
              Reviews
            </div>
            <div className="absolute w-[264px] h-[197px] top-[63px] left-11 bg-[#f0f0f0] rounded-[15px]" />
            <div className="absolute w-[265px] h-[197px] top-[63px] left-[342px] bg-[#f0f0f0] rounded-[15px]" />
            <div className="absolute w-[264px] h-[197px] top-[63px] left-[641px] bg-[#f0f0f0] rounded-[15px]" />
            <div className="left-[924px] absolute w-[17px] h-6 top-[141px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[25px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              →
            </div>
            <div className="left-2 absolute w-[17px] h-6 top-[141px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-[25px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              ←
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LearnerLearn;
