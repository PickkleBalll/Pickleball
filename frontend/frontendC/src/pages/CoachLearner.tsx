import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLearnersByCoach } from '@/services/learnerInfoService';

interface Learner {
  id: string;
  name: string;
  level: string;
  nationality: string;
  avatarUrl: string;
}


const CoachLearner: React.FC = () => {
  const [learners, setLearners] = useState<Learner[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchLearners = async () => {
    try {
      const coachId = localStorage.getItem('coachId');
      if (!coachId) return;

      const response = await getLearnersByCoach(coachId);

      // Ép kiểu rõ ràng tại đây
      setLearners(response as Learner[]);
    } catch (error) {
      console.error('Lỗi lấy learner:', error);
    }
  };

  fetchLearners();
}, []);


  return (
    <div className="bg-[#f0f0f0] min-h-screen font-['Roboto'] pb-20">
      {/* Thanh tìm kiếm */}
      <div className="flex justify-center mt-9 mb-12">
        <input
          type="text"
          placeholder="Find Learner"
          className="w-[800px] h-[38px] pl-4 rounded-[20px] border border-black shadow"
        />
      </div>

      {/* Grid danh sách learner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[77px] gap-y-[55px] px-[80px] md:px-[140px] xl:px-[197px]">
        {learners.map((learner, index) => (
          <div key={index} className="w-[328px] h-[183px] bg-white rounded-[40px] relative shadow">
            <img
              src={learner.avatarUrl || '/default-avatar.jpg'}
              alt={learner.name}
              className="absolute left-[25px] top-[17px] w-[100px] h-[100px] rounded-full object-cover border border-black"
            />
            <div className="ml-[150px] mt-8">
              <h3 className="text-[20px] font-extrabold text-black">{learner.name}</h3>
              <p className="text-[16px] font-light text-[#b6b6b6] mt-1 ml-14">{learner.level}</p>
              <p className="text-[16px] font-light text-[#b6b6b6] mt-0 ml-14">{learner.nationality}</p>
            </div>

            {/* Nút chuyển trang */}
            <button
              onClick={() => navigate('/coach/tutorials')}
              className="absolute bottom-[15px] left-[110px] w-[110px] h-[32px] bg-[#d5f25d] hover:bg-[#c5e24d] rounded-[40px] border border-black text-black font-extrabold text-[15px] tracking-wide"
            >
              CONTACT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachLearner;
