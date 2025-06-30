import React, { useEffect, useState } from 'react';
import user from '@/assets/Image/16.jpg';
import { useLocation } from 'react-router-dom';
import type { ListCoach } from '../../service/UserService';

const LearnerLearn: React.FC = () => {
  const [coach, setCoach] = useState<ListCoach | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // State for popup

  const location = useLocation();
  const coachData = location.state?.coach as ListCoach | undefined;

  useEffect(() => {
    console.log('Coach Data from State:', coachData);
    if (coachData) {
      setCoach(coachData);
      setLoading(false);
    } else {
      setError('Coach information not found.');
      setLoading(false);
    }
  }, [coachData]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error || !coach)
    return (
      <div className="text-center mt-40 text-black">
        {error || 'Error: No coach data available.'}
      </div>
    );

  return (
    <section className="pb-12 mb-12">
      <div className="flex flex-row justify-center w-full">
        <div className="bg-[#f0f0f0] w-[1440px] h-[1024px] relative">
          <div className="absolute w-[933px] h-[300px] top-4 left-[255px]"> {/* Giảm chiều cao vì thông tin ít hơn */}
            <div className="absolute w-[769px] h-[269px] top-0 left-[164px] bg-black rounded-[40px]" />
            <div className="absolute w-[328px] h-[194px] top-11 left-0 bg-white rounded-[40px]" />
            <div className="absolute top-[121px] left-[205px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#b6b6b6] text-[13px] tracking-[0] leading-[normal] whitespace-nowrap">
              Level 2
            </div>
            <div className="absolute top-36 left-[205px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#b6b6b6] text-[13px] tracking-[0] leading-[normal] whitespace-nowrap">
              British
            </div>
            <img
              className="w-[100px] h-[100px] top-[65px] left-[26px] absolute object-cover rounded-full"
              alt="Coach"
              src={user}
            />
            <div className="absolute top-[92px] left-[151px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal] whitespace-nowrap">
              {coach.fullName}
            </div>

            {/* Thêm nút Contact để mở popup */}
            <div
              className="absolute w-[153px] h-[29px] top-[196px] left-[87px] bg-[#d5f25d] rounded-[40px] border border-solid border-black cursor-pointer flex items-center justify-center"
              onClick={() => setIsPopupOpen(true)}
            >
              <div className="[font-family:'Roboto-Bold',Helvetica] font-bold text-black text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
                CONTACT
              </div>
            </div>

            {/* Hiển thị bio của coach */}
            <div className="absolute top-6 left-[368px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
              Bio
            </div>
            <p className="absolute top-[60px] left-[392px] [font-family:'Roboto-Bold',Helvetica] font-bold text-[#ececec] text-[15px] tracking-[0] leading-[normal] max-w-[500px] overflow-wrap-break-word whitespace-normal">
              {coach.bio}
            </p>
          </div>

          <div className="absolute w-[949px] h-[293px] top-[350px] left-[259px] bg-white rounded-[50px]">
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

          {/* Popup Contact Information */}
          {isPopupOpen && coach && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4">Coach Contact Information</h2>
                <p>
                  <strong>Name:</strong> {coach.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {coach.email}
                </p>
                <p>
                  <strong>Phone:</strong> {coach.phone || 'N/A'}
                </p>
                <p>
                  <strong>Role:</strong> {coach.role}
                </p>
                <p>
                  <strong>Email Contact:</strong> {coach.emailContact || 'N/A'}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-[#d5f25d] rounded-full font-bold"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LearnerLearn;