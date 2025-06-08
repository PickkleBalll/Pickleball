import React, { useState } from 'react';
import user from '@/assets/Image/user.png';

const mockCoaches = [
  { id: 1, name: 'GLORIA BROMLEY', level: 'Level 2', hourlyRate: '2.99$', packageRate: '1.99$', reason: 'Experienced coach with positive feedback' },
  { id: 2, name: 'JACKIE NGUYEN', level: 'Level 3', hourlyRate: '3.50$', packageRate: '2.50$', reason: 'Specialized in beginners and kids' },
  { id: 3, name: 'SOPHIE WILLIAMS', level: 'Level 1', hourlyRate: '2.00$', packageRate: '1.70$', reason: 'Certified by National Pickleball Org' },
  { id: 4, name: 'LIAM NGUYỄN', level: 'Level 2', hourlyRate: '2.20$', packageRate: '1.90$', reason: 'Bilingual coaching: English and Vietnamese' },
  { id: 5, name: 'ETHAN CHEN', level: 'Level 1', hourlyRate: '1.90$', packageRate: '1.50$', reason: 'Trained over 200 students' },
  { id: 6, name: 'EMILY TRAN', level: 'Level 3', hourlyRate: '3.80$', packageRate: '3.00$', reason: 'Focuses on advanced tactical plays' },
  { id: 7, name: 'NOAH KIM', level: 'Level 2', hourlyRate: '2.60$', packageRate: '2.10$', reason: 'Highly rated for friendly coaching style' },
  { id: 8, name: 'AVA PHAM', level: 'Level 1', hourlyRate: '1.80$', packageRate: '1.30$', reason: 'Recommended for seniors and adults' },
  { id: 9, name: 'OLIVIA VU', level: 'Level 3', hourlyRate: '3.70$', packageRate: '3.20$', reason: 'International Pickleball Federation certified' },
  { id: 10, name: 'WILLIAM LE', level: 'Level 2', hourlyRate: '2.40$', packageRate: '2.00$', reason: 'Offers flexible time slots' },
  { id: 11, name: 'ISABELLA NGÔ', level: 'Level 1', hourlyRate: '1.95$', packageRate: '1.55$', reason: 'Loves teaching beginners with patience' },
  { id: 12, name: 'JAMES DO', level: 'Level 3', hourlyRate: '4.00$', packageRate: '3.50$', reason: 'Coached national-level teams' },
  { id: 13, name: 'MIA LAM', level: 'Level 2', hourlyRate: '2.75$', packageRate: '2.30$', reason: 'Active tournament player' },
  { id: 14, name: 'LOGAN MAI', level: 'Level 1', hourlyRate: '1.85$', packageRate: '1.45$', reason: 'Enthusiastic and youth-friendly' },
  { id: 15, name: 'CHARLOTTE HOANG', level: 'Level 2', hourlyRate: '2.60$', packageRate: '2.10$', reason: 'Focuses on strong fundamentals' },
  { id: 16, name: 'BENJAMIN NGUYEN', level: 'Level 1', hourlyRate: '1.75$', packageRate: '1.35$', reason: 'Enjoys coaching families together' },
  { id: 17, name: 'HARPER PHAN', level: 'Level 2', hourlyRate: '2.50$', packageRate: '2.05$', reason: 'Highly flexible and adaptive sessions' },
  { id: 18, name: 'LUCAS THAI', level: 'Level 3', hourlyRate: '3.90$', packageRate: '3.30$', reason: 'Trains for competition-level play' },
  { id: 19, name: 'AMELIA VUONG', level: 'Level 1', hourlyRate: '2.00$', packageRate: '1.60$', reason: 'Very beginner friendly' },
  { id: 20, name: 'HENRY DAO', level: 'Level 2', hourlyRate: '2.70$', packageRate: '2.20$', reason: 'Trained by top Thai pickleball coaches' },
  { id: 21, name: 'GRACE PHUNG', level: 'Level 1', hourlyRate: '1.95$', packageRate: '1.55$', reason: 'Calm and supportive atmosphere' },
  { id: 22, name: 'SEBASTIAN HA', level: 'Level 2', hourlyRate: '2.80$', packageRate: '2.25$', reason: 'Focus on backhand techniques' },
  { id: 23, name: 'LILY VU', level: 'Level 1', hourlyRate: '1.90$', packageRate: '1.45$', reason: 'Great with kids and teens' },
  { id: 24, name: 'DANIEL NGO', level: 'Level 3', hourlyRate: '3.60$', packageRate: '3.10$', reason: '10+ years experience' },
  { id: 25, name: 'EVELYN LAM', level: 'Level 2', hourlyRate: '2.85$', packageRate: '2.35$', reason: 'Mentors new coaches too' },
  { id: 26, name: 'MATTHEW VU', level: 'Level 1', hourlyRate: '1.85$', packageRate: '1.40$', reason: 'Interactive drills and fun games' },
  { id: 27, name: 'SOFIA DINH', level: 'Level 2', hourlyRate: '2.55$', packageRate: '2.00$', reason: 'Patient with all age groups' },
  { id: 28, name: 'DAVID BUI', level: 'Level 3', hourlyRate: '3.95$', packageRate: '3.45$', reason: 'Trained in US Pickleball Academy' },
  { id: 29, name: 'ZOE TRUONG', level: 'Level 1', hourlyRate: '1.80$', packageRate: '1.30$', reason: 'Fun approach to lessons' },
  { id: 30, name: 'JACK PHAM', level: 'Level 2', hourlyRate: '2.90$', packageRate: '2.40$', reason: 'Weekend classes available' },
  { id: 31, name: 'NINA CHAU', level: 'Level 1', hourlyRate: '1.70$', packageRate: '1.25$', reason: 'Great with elderly learners' },
  { id: 32, name: 'RYAN NGUYEN', level: 'Level 2', hourlyRate: '2.65$', packageRate: '2.15$', reason: 'Focuses on match simulations' },
  { id: 33, name: 'ARIEL DO', level: 'Level 3', hourlyRate: '4.10$', packageRate: '3.70$', reason: 'Elite coaching for tournaments' },
  { id: 34, name: 'ELLA LE', level: 'Level 1', hourlyRate: '1.90$', packageRate: '1.45$', reason: 'Offers free trial lesson' },
  { id: 35, name: 'AIDEN PHAN', level: 'Level 2', hourlyRate: '2.70$', packageRate: '2.25$', reason: 'Focus on forehand technique' },
  { id: 36, name: 'CHLOE VO', level: 'Level 1', hourlyRate: '1.85$', packageRate: '1.40$', reason: 'Fun and energetic style' },
  { id: 37, name: 'LEO DANG', level: 'Level 3', hourlyRate: '3.85$', packageRate: '3.35$', reason: 'Former national team assistant' },
  { id: 38, name: 'PENELOPE TRAN', level: 'Level 2', hourlyRate: '2.95$', packageRate: '2.50$', reason: 'Focuses on doubles strategies' },
  { id: 39, name: 'ISAAC KHOA', level: 'Level 1', hourlyRate: '1.80$', packageRate: '1.35$', reason: 'Beginner-focused with warmup drills' },
  { id: 40, name: 'VICTORIA HA', level: 'Level 2', hourlyRate: '2.85$', packageRate: '2.30$', reason: 'Evening sessions preferred' },
];


const ITEMS_PER_PAGE = 9;

const LearnerCoach: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCoaches = mockCoaches.filter((coach) =>
    coach.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        >
          &lt;
        </button>

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
        >
          &gt;
        </button>
      </div>
    );
  };

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
            <div className="flex">
              <img className="w-[100px] h-[100px] rounded-full border" alt="coach" src={user} />
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
              <p className="font-semibold text-[#5d5555] text-xs">{coach.reason}</p>
            </div>
            <div className="flex justify-center pt-4">
              <div className="flex justify-center items-center w-28 border-2 rounded-full text-base font-bold bg-[#d5f25d] cursor-pointer">
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
