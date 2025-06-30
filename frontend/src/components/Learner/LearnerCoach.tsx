import React, { useState, useEffect } from 'react';
import { getAllCoaches } from '../../service/UserService';
import type { ListCoach } from '../../service/UserService';
import user from '@/assets/Image/user-woman.jpg';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const LearnerCoach: React.FC = () => {
  const [coaches, setCoaches] = useState<ListCoach[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoaches, setSelectedCoaches] = useState<ListCoach[]>([]); // Lưu danh sách coach đã chọn

  const navigate = useNavigate();

  // Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setLoading(true);
        const data = await getAllCoaches();
        setCoaches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  // Lọc coaches dựa trên searchQuery
  const filteredCoaches = coaches.filter((coach) =>
    coach.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoaches.length / ITEMS_PER_PAGE);
  const paginatedCoaches = filteredCoaches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return (
      <div className="flex justify-center mt-8 space-x-2 text-base font-semibold">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-gray-400 hover:text-black"
        ></button>

        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-full hover:bg-[#d5f25d] hover:text-black ${
                currentPage === page ? 'bg-black text-[#d5f25d]' : 'text-black'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 py-1 text-gray-500">
              ...
            </span>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-gray-400 hover:text-black"
        ></button>
      </div>
    );
  };

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
      {/* Search */}
      <input
        type="text"
        className="mx-36 w-full max-w-3xl h-[38px] pl-3 rounded-full text-sm focus:outline-black/60 border border-black/50 placeholder-black"
        placeholder="Find coach"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset page on search
        }}
      />

      {/* Coach Cards */}
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {paginatedCoaches.map((coach) => (
          <div
            key={coach.id}
            className="w-80 px-5 py-4 border rounded-4xl bg-white shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center justify-center">
              <img className="w-[100px] h-[100px] rounded-full border" alt="coach" src={user} />
              <div className="flex flex-col items-center pt-6">
                <p className="font-semibold text-black text-lg">{coach.fullName}</p>
                <p className="font-semibold text-[#b6b6b6]">Level {coach.role || 'N/A'}</p>
              </div>
              <div className="flex flex-col text-center space-y-2">
                <p className="font-semibold text-[#b6b6b6] text-xs">Reason for recommendation</p>
                <p className="font-semibold text-[#5d5555] text-xs">
                  {coach.bio || 'Fun and energetic style'}
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
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

      {/* Pagination */}
      {renderPagination()}
    </section>
  );
};

export default LearnerCoach;
