import React from 'react';
import user from '../../../assets/Image/user-woman.jpg';

const LearnerHome: React.FC = () => {
  return (
    <section className="pb-12">
      <div className="flex justify-around mt-10 mx-56">
        {/* User Card Section */}
        <div className="flex flex-col items-center w-[400px] py-8 bg-white rounded-[50px]">
          <img className="w-[140px] h-[140px] rounded-full" alt="Ellipse" src={user} />
          <div className="pt-4 font-semibold text-black text-xl">SELENE ARVEN</div>
          <div className="pt-4 font-light text-[#727272] text-xl">Gender: Female</div>
        </div>
      </div>
    </section>
  );
};
export default LearnerHome;
