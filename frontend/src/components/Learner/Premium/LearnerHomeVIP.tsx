import React, { useEffect, useRef, useState } from 'react';
import user from '@/assets/Image/16.jpg';
import { useNavigate } from 'react-router-dom';
import UpgradeModal from '../UpgradeModal';
import { getAllCoaches } from '../../../service/UserService';
import type { ListCoach } from '../../../service/UserService';

const tutorialVideos = [
  {
    title: '4 Things Beginners MUST Learn  The Pickleball Clinic',
    url: '/videos/4 Things Beginners MUST Learn  The Pickleball Clinic - The Pickleball Clinic (720p, h264).mp4',
  },
  {
    title: 'How to Play Pickleball - USA Pickleball ',
    url: '/videos/How to Play Pickleball - USA Pickleball (720p, h264).mp4',
  },
  {
    title: 'Pickleball SINGLES Rules Breakdown - ThatPickleballGuy - Kyle Koszuta',
    url: '/videos/Pickleball SINGLES Rules Breakdown - ThatPickleballGuy - Kyle Koszuta (1080p, h264).mp4',
  },
];

const LearnerHomeVip: React.FC = () => {
  const navigate = useNavigate();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [coaches, setCoaches] = useState<ListCoach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoaches, setSelectedCoaches] = useState<ListCoach[]>([]); // Lưu danh sách coach đã chọn

  // Giới hạn 15s
  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (video && video.currentTime >= 15) {
        video.currentTime = 15;
        video.pause();
        setShowUpgradeModal(true);
      }
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [selectedVideo]);

  // Lấy danh sách huấn luyện viên và giới hạn 3 cái
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const data = await getAllCoaches();
        // Giới hạn chỉ lấy 3 coach
        const limitedCoaches = data.slice(0, 3);
        setCoaches(limitedCoaches);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  // Hàm xử lý khi nhấn REGISTER
  const handleRegister = (coach: ListCoach) => {
    const updatedSelectedCoaches = [...selectedCoaches, coach];
    setSelectedCoaches(updatedSelectedCoaches);
    localStorage.setItem('selectedCoaches', JSON.stringify(updatedSelectedCoaches)); // Lưu vào localStorage
    navigate('/learn'); // Chuyển hướng đến trang Learn
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <section className="mx-48 mb-12">
      <p className="text-5xl text-start pt-5 pl-10 border-b border-[#9AB301] w-64">COACHES</p>
      <p
        className="flex justify-end mt-8 text-lg font-medium text-black/60 cursor-pointer"
        onClick={() => navigate('/learnerCoach')}
      >
        View all coaches →
      </p>

      {/* COACHES */}
      <div className="flex flex-wrap justify-start gap-4 w-full pl-10 pt-3 ">
        {coaches.map((coach, index) => (
          <div key={index} className="w-80 px-5 py-4 border rounded-4xl bg-white">
            <div className="flex flex-col items-center">
              <img
                className="w-[100px] h-[100px] rounded-full border"
                alt="Coach Avatar"
                src={user}
              />
              <div className="flex flex-col items-center pt-6 pl-4">
                <p className="font-semibold text-black text-lg">{coach.fullName}</p>
                <p className="font-semibold text-[#b6b6b6]">level 1</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center pl-5 space-y-2">
              <p className="font-semibold text-[#b6b6b6] text-xs">Reason for recommendation</p>
              <p className="font-semibold text-[#5d5555] text-xs">{coach.bio || 'N/A'}</p>
            </div>
            <div className="flex justify-center items-center pt-4 pl-5">
              <div
                className="flex justify-center items-center w-28 border-2 rounded-full text-base font-bold bg-[#d5f25d] cursor-pointer"
                onClick={() => handleRegister(coach)}
              >
                <p>REGISTER</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-5xl text-start pt-20 mb-10 pl-10 border-b border-[#9AB301] w-[470px]">VIDEO TUTORIALS</p>
      </div>

      {/* TUTORIAL VIDEO THUMBNAILS */}
      <div className="flex flex-wrap gap-3 mt-10 pl-10">
        {tutorialVideos.map((video, idx) => (
          <div
            key={idx}
            className="w-[320px] h-[180px] rounded-xl overflow-hidden border-2 border-black cursor-pointer shadow"
            onClick={() => {
              setSelectedVideo(video.url);
              setIsVideoOpen(true);
            }}
          >
            <video className="w-full h-full object-cover" muted>
              <source src={video.url} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      {/* FULLSCREEN VIDEO MODAL */}
      {isVideoOpen && selectedVideo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex justify-center items-center">
          <div className="relative w-[80%] max-w-4xl">
            <button
              onClick={() => {
                setIsVideoOpen(false);
                setSelectedVideo(null);
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.currentTime = 0;
                }
              }}
              className="absolute top-2 right-2 text-white text-2xl font-bold z-50"
            >
              ✕
            </button>
            <video ref={videoRef} controls autoPlay className="rounded-xl w-full shadow">
              <source src={selectedVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

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


      {/* UPGRADE MODAL */}
      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => {
            setShowUpgradeModal(false);
            setIsVideoOpen(false);
            setSelectedVideo(null);
          }}
          onUpgrade={() => {
            setShowUpgradeModal(false);
            setIsVideoOpen(false);
            setSelectedVideo(null);
            navigate('/package');
          }}
        />
      )}
    </section>
  );
};

export default LearnerHomeVip;
