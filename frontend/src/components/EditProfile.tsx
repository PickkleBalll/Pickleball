import React from 'react';
import user from '@/assets/Image/user.png';

const EditProfile: React.FC = () => {
  return (
    <div className="bg-[#f0f0f0] flex flex-row justify-center w-full">
      <div className="bg-[#f0f0f0] w-[1440px] h-[1024px] relative">
        <img
          className="w-[200px] h-[200px] top-[230px] left-[248px] absolute object-cover"
          alt="Ellipse"
          src={user}
        />
        <div className="absolute top-[169px] left-[259px] [font-family:'Roboto-Bold',Helvetica] font-bold text-black text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
          Profile Photo
        </div>
        <div className="absolute top-[497px] left-[259px] [font-family:'Roboto-Bold',Helvetica] font-bold text-black text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
          Basic Information
        </div>
        <div className="absolute top-[566px] left-[259px] [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Fullname
        </div>
        <div className="absolute top-[629px] left-[259px] [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Date of birth
        </div>
        <div className="absolute top-[692px] left-[259px] [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Gender
        </div>
        <div className="absolute top-[755px] left-[259px] [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Email
        </div>
        <div className="absolute top-[818px] left-[259px] [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Phone number
        </div>
        <div className="absolute top-[881px] left-[259px] [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Interest
        </div>
        <div className="absolute top-[566px] left-[561px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#a7a7a7] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Selena Arven
        </div>
        <div className="absolute top-[629px] left-[561px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#a7a7a7] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          12/12/1999
        </div>
        <div className="absolute top-[692px] left-[561px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#a7a7a7] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Female
        </div>
        <div className="absolute top-[755px] left-[561px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#a7a7a7] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          arven@gmail.com
        </div>
        <div className="absolute top-[818px] left-[561px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#a7a7a7] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          01234567910
        </div>
        <div className="absolute top-[881px] left-[561px] [font-family:'Roboto-Medium',Helvetica] font-medium text-[#a7a7a7] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
          Pickleball
        </div>
        <div className="absolute w-[129px] h-[47px] top-[371px] left-[555px] bg-[#f0f0f0] rounded-[15px] border border-solid border-[#727272]">
          <div className="absolute top-[11px] left-[29px] [font-family:'Roboto-Bold',Helvetica] font-bold text-black text-lg tracking-[0] leading-[normal] whitespace-nowrap">
            UPLOAD
          </div>
        </div>
        {/* <Size48
className="!top-[560px] !absolute !w-[30px] !h-[30px] !left-[959px]"
color="#B3B3B3"
/>
<Size48
className="!top-[623px] !absolute !w-[30px] !h-[30px] !left-[959px]"
color="#B3B3B3"
/>
<Size48
className="!top-[686px] !absolute !w-[30px] !h-[30px] !left-[959px]"
color="#B3B3B3"
/>
<Size48
className="!top-[749px] !absolute !w-[30px] !h-[30px] !left-[959px]"
color="#B3B3B3"
/>
<Size48
className="!top-[812px] !absolute !w-[30px] !h-[30px] !left-[959px]"
color="#B3B3B3"
/>
<Size48
className="!top-[881px] !absolute !w-[30px] !h-[30px] !left-[959px]"
color="#B3B3B3"
/> */}
        <p className="absolute top-[272px] left-[550px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#a7a7a7] text-[22px] tracking-[0] leading-[normal]">
          This will be displayed to other users when they view your profile or posts. <br />
          Max size: 2MB
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
