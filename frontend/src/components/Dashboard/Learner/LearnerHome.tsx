import React from 'react';
import user from '@/assets/Image/user.png';
import { useNavigate } from 'react-router-dom';

const coaches = [
  {
    name: 'GLORIA BROMLEY',
    level: 'Level 2',
    hourlyRate: '2.99$',
    packageRate: '1.99$',
    recommendation: 'Has a course for your learning purpose',
  },
  {
    name: 'LIAM CARTER',
    level: 'Level 3',
    hourlyRate: '3.50$',
    packageRate: '2.50$',
    recommendation: 'Highly rated by students',
  },
  {
    name: 'SOPHIA NGUYEN',
    level: 'Level 1',
    hourlyRate: '2.20$',
    packageRate: '1.80$',
    recommendation: 'Great for beginners',
  },
];

const LearnerHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-48 mb-12">
      <input
        type="text"
        className="mx-36 w-full max-w-3xl h-[38px] pl-3 rounded-full text-sm focus:outline-black/60 border border-black/50 placeholder-black"
        placeholder="Find coach"
      />
      <p
        className="flex justify-end mt-8 text-lg font-medium thover:ext-black text-black/60 cursor-pointer"
        onClick={() => navigate('/coach')}
      >
        View all coaches →
      </p>

      {/* COACHES SECTION */}
      <div className="flex flex-wrap justify-start gap-5 w-full pl-10 pt-3">
        {coaches.map((coach, index) => (
          <div key={index} className="w-80 px-5 py-4 border rounded-4xl">
            <div className="flex">
              <img
                className="w-[100px] h-[100px] rounded-full border"
                alt="Coach Avatar"
                src={user}
              />
              <div className="flex flex-col items-center pt-6 pl-4">
                <p className="font-semibold text-black text-lg">{coach.name}</p>
                <p className="font-semibold text-[#b6b6b6]">{coach.level}</p>
              </div>
            </div>
            <div className="flex justify-start space-x-12 pl-5 pt-4">
              <p className="font-semibold text-[#b6b6b6] text-xs">Hourly rate from</p>
              <p className="font-semibold text-[#b6b6b6] text-xs">Package with</p>
            </div>
            <div className="flex justify-start space-x-20 pl-12 pt-1 pb-3">
              <p className="font-semibold text-[#5e5555] text-base">{coach.hourlyRate}</p>
              <p className="font-semibold text-[#5e5555] text-base">{coach.packageRate}</p>
            </div>
            <div className="flex flex-col pl-5 space-y-2">
              <p className="font-semibold text-[#b6b6b6] text-xs">Reason for recommendation</p>
              <p className="font-semibold text-[#5d5555] text-xs">{coach.recommendation}</p>
            </div>
            <div className="flex justify-center pt-4">
              <div className="flex justify-center items-center w-28 border-2 rounded-full text-base font-bold bg-[#d5f25d] cursor-pointer">
                <p>REGISTER</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI SECTION */}
      <div className="flex justify-between px-10 py-10 mt-10 w-[1100px] h-[300px] bg-white rounded-4xl">
        <p className="w-full max-w-3xl px-12 pt-14 font-bold text-3xl">
          Not sure if you're doing it right? Upload your video — our AI coach will check your form
          and help you play better!
        </p>
        <div className="flex justify-center w-full max-w-64 pt-24 font-medium text-xl text-[#d5f25d] bg-black rounded-4xl cursor-pointer">
          <p>UPLOAD YOUR VIDEO</p>
        </div>
      </div>
    </section>
  );
};

export default LearnerHome;
