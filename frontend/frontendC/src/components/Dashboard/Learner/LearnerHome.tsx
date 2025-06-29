// src/pages/LearnerHome.tsx
import React, { useEffect, useState } from 'react';
import user from '@/assets/Image/user-woman.jpg';
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '@/services/courseService';
import { getLearnerByUserId } from '@/services/learnerService';
import { registerCourse, payCourse, Booking, PaymentResult } from '@/services/bookingService';

interface Coach {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  specialty: string;
  isVerified: boolean;
  createdAt: string;
}

interface Course {
  packageId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  coach: {
    id: string;
    fullName: string;
  };
}

interface CoachWithCourse {
  coach: {
    id: string;
    fullName: string;
  };
  course: Course;
}

const LearnerHome: React.FC = () => {
  const navigate = useNavigate();
  const [coachCourseList, setCoachCourseList] = useState<CoachWithCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses: Course[] = await getAllCourses();
        const uniqueCoachCourses = new Map<string, CoachWithCourse>();

        for (const course of allCourses) {
          if (!uniqueCoachCourses.has(course.coach.id)) {
            uniqueCoachCourses.set(course.coach.id, {
              coach: course.coach,
              course,
            });
          }
        }

        setCoachCourseList(Array.from(uniqueCoachCourses.values()));
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

const handleRegister = async (courseId: string) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const token = localStorage.getItem('token');
  const userId = currentUser?.id;

  if (!userId || !token) {
    alert('Bạn chưa đăng nhập!');
    return;
  }

  try {
    const learnerData = await getLearnerByUserId(userId);
    const learnerId = learnerData?.id;

    if (!learnerId) throw new Error('Không tìm thấy Learner.');

    const booking: Booking = await registerCourse(learnerId, courseId);
    console.log('Đăng ký thành công:', booking);
    console.log('Booking:', booking);
    console.log('Booking ID:', booking?.id);

    // 👉 Chuyển sang trang thanh toán
    navigate(`/payment/${booking.id}`, { state: { bookingId: booking.id } });
  } catch (err: any) {
    console.error('Lỗi:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Đăng ký thất bại');
  }
};
const filteredCoaches = coachCourseList.filter(({ coach }) =>
  coach.fullName.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <section className="mx-48 mb-12">
      <input
  type="text"
  className="mx-36 w-full max-w-3xl h-[38px] pl-3 rounded-full text-sm focus:outline-black/60 border border-black/50 placeholder-black"
  placeholder="Find coach"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

      <p
        className="flex justify-end mt-8 text-lg font-medium text-black/60 cursor-pointer"
        onClick={() => navigate('/coach')}
      >
        View all coaches →
      </p>

      <div className="flex flex-wrap justify-start gap-4 w-full pl-10 pt-3">
        {filteredCoaches.map(({ coach, course }, index) => (
          <div key={index} className="w-80 px-5 py-4 border rounded-4xl bg-white">
            <div className="flex">
              <img
                className="w-[100px] h-[100px] rounded-full border"
                alt="Coach Avatar"
                src={user}
              />
              <div className="flex flex-col items-center pt-6 pl-4">
                <p className="font-semibold text-black text-lg">{coach.fullName}</p>
                <p className="font-semibold text-[#b6b6b6]">Coach</p>
              </div>
            </div>

            <div className="flex justify-start pl-5 pt-4">
              <p className="font-semibold text-[#b6b6b6] text-xs">Sample Course</p>
            </div>
            <div className="flex flex-col pl-6 pt-1 pb-3">
              <p className="font-semibold text-[#5e5555] text-sm">Title: {course.title}</p>
              <p className="font-semibold text-[#5e5555] text-sm">Price: ${course.price}</p>
            </div>

            <div className="flex justify-center pt-4 gap-2">
              <button
                onClick={() => handleRegister(course.packageId)}
                className="flex justify-center items-center w-28 border-2 rounded-full text-base font-bold bg-[#d5f25d] cursor-pointer"
              >
                REGISTER
              </button>

              <button
                onClick={() => navigate(`/course/${course.packageId}`)}
                className="flex justify-center items-center w-28 border-2 rounded-full text-base font-bold bg-[#f0f0f0] cursor-pointer"
              >
                VIEW
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between px-10 py-10 mt-10 w-[1100px] h-[300px] bg-white rounded-4xl">
        <p className="w-full max-w-3xl px-12 pt-14 font-bold text-3xl">
          Not sure if you're doing it right? Upload your video — our AI coach will check your form and help you play better!
        </p>
        <div className="flex justify-center w-full max-w-64 pt-24 font-medium text-xl text-[#d5f25d] bg-black rounded-4xl cursor-pointer">
          <p>UPLOAD YOUR VIDEO</p>
        </div>
      </div>
    </section>
  );
};

export default LearnerHome;
