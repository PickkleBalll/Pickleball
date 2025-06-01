import React from 'react';
import user from '../../../assets/Image/user-woman.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const LearnerProfile: React.FC = () => {
  return (
    <section className="bg-[#f0f0f0] pb-12">
      <div className="flex justify-around mt-10 mx-56">
        {/* User Card Section */}
        <div className="flex flex-col items-center w-[400px] py-8 bg-white rounded-[50px]">
          <img className="w-[140px] h-[140px] rounded-full" alt="Ellipse" src={user} />
          <div className="pt-4 font-semibold text-black text-xl">SELENE ARVEN</div>
          <div className="pt-4 font-light text-[#727272] text-xl">Gender: Female</div>
        </div>

        {/* Profile Information Section */}
        <div className="w-[500px] bg-white rounded-[50px]">
          <div className="flex space-x-[300px] py-4 px-12 border-b-2 border-[#666666]">
            <div className="font-bold text-xl text-black ">PROFILE</div>
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="xl"
              style={{ color: '#000000' }}
              className="cursor-pointer"
            />
          </div>
          <div className="py-7 px-12 space-y-4">
            <div className="font-light text-[#727272] text-lg">Nationality: British</div>
            <div className="font-light text-[#727272] text-lg">Learning: Pickleball</div>
            <div className="font-light text-[#727272] text-lg">Skills Level:</div>
            <div className="font-light text-[#727272] text-lg ">Interest:</div>
          </div>
        </div>
      </div>

      {/* Lesson Feedback Section */}
      <div className="flex flex-col py-6 px-10 mx-60 my-10 bg-white rounded-[50px]">
        <div className="pb-4 font-bold text-2xl border-b-2 border-[#EBEAE7]/50">
          Lesson Feedback
        </div>
        <div className="font-medium=">
          <p className="py-4 text-xl border-b-2 border-[#EBEAE7]/50">Lesson history</p>
        </div>
        <div className="font-normal text-xl">
          <div className="flex justify-end space-x-12 py-4 pr-14 border-b-2 border-[#EBEAE7]/50">
            <p className="text-[#727272] text-base"> LAST MONTH</p>
            <p className="text-[#727272] text-base"> LAST 3 MONTHS</p>
            <p className="text-[#727272] text-base"> ALL TIME</p>
          </div>
          <p className="py-4 text-xl border-b-2 border-[#EBEAE7]/50">Completed lessons</p>
        </div>
        <div className="py-4 font-normal text-xl border-b-2 border-[#EBEAE7]/50">
          Attendance rate
        </div>
        <div>
          <div className="py-4 font-medium text-xl border-b-2 border-[#EBEAE7]/50">
            Coach reviews
          </div>
          <div className="py-4 font-medium text-[#c8c7c5] text-xl text-center">No record</div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="py-6 px-10 mx-60 bg-white rounded-[50px] border-b-2 border-[#EBEAE7]/50">
        <div className="font-semibold text-black text-2xl">Activities</div>
        <div className="py-4 font-medium text-[#c8c7c5] text-xl text-center">No record</div>
      </div>
    </section>
  );
};
export default LearnerProfile;
