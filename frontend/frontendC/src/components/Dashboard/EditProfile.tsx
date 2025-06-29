import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLearnerByUserId, updateLearnerProfile } from '@/services/learnerService';

interface Learner {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth?: string; // Added as it's in the image, though not used in formData
  userId: string;
  isVerified: boolean;
  createdAt: string;
}

interface LearnerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

const EditLearnerProfile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedLearner = location.state?.learner;

  const [formData, setFormData] = useState<LearnerFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });

  // State to hold the date of birth from the fetched learner data, as it's displayed but not editable via formData
  const [dateOfBirthDisplay, setDateOfBirthDisplay] = useState<string>('');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let learnerData: Learner;
        if (passedLearner) {
          learnerData = passedLearner;
        } else {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            setError('User ID not found. Please log in.');
            return;
          }
          const data = await getLearnerByUserId(userId);
          learnerData = data as Learner;
        }

        setFormData({
          fullName: learnerData.fullName || '',
          email: learnerData.email || '',
          phoneNumber: learnerData.phoneNumber || '',
          gender: learnerData.gender || '',
        });
        // Set dateOfBirth for display purposes, as it's not part of the editable form fields
        setDateOfBirthDisplay(learnerData.dateOfBirth || 'N/A');

      } catch (err) {
        console.error(err);
        setError('Không thể tải thông tin hồ sơ');
      }
    };

    fetchProfile();
  }, [passedLearner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // The updateLearnerProfile API might need userId, assuming it's handled internally by the service or middleware
      await updateLearnerProfile(formData);
      setSuccessMessage('Cập nhật thành công!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data || 'Cập nhật thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-[30px] shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
        <img
          src="https://media-cdn-v2.laodong.vn/storage/newsportal/2023/10/19/1256686/Ngoc-Trinh-Fr.jpeg" // Ảnh mặc định từ mạng
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
        />
        {/* Basic Information Section (using form fields for editing) */}
        <section className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Fullname */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <label htmlFor="fullName" className="text-gray-600 w-1/3">Fullname</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              {/* This pencil icon is illustrative; actual edit functionality is via input */}
              <span className="ml-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 3.033L10 9.043l-9.043 9.043L0 20l1.957-1.957L10.957 10l-3.033-3.033z" />
                </svg>
              </span>
            </div>

            {/* Date of birth (Display only, as per provided formData) */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-600 w-1/3">Date of birth</span>
              <span className="flex-1 px-3 py-2 text-gray-800">{dateOfBirthDisplay}</span>
              <span className="ml-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 3.033L10 9.043l-9.043 9.043L0 20l1.957-1.957L10.957 10l-3.033-3.033z" />
                </svg>
              </span>
            </div>

            {/* Gender */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <label htmlFor="gender" className="text-gray-600 w-1/3">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
              <span className="ml-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 3.033L10 9.043l-9.043 9.043L0 20l1.957-1.957L10.957 10l-3.033-3.033z" />
                </svg>
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <label htmlFor="email" className="text-gray-600 w-1/3">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <span className="ml-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 3.033L10 9.043l-9.043 9.043L0 20l1.957-1.957L10.957 10l-3.033-3.033z" />
                </svg>
              </span>
            </div>

            {/* Phone number */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <label htmlFor="phoneNumber" className="text-gray-600 w-1/3">Phone number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="ml-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 3.033L10 9.043l-9.043 9.043L0 20l1.957-1.957L10.957 10l-3.033-3.033z" />
                </svg>
              </span>
            </div>

            {/* Interest (Display only, not in formData) */}
            <div className="flex items-center justify-between pb-3"> {/* No border-b for the last item */}
              <span className="text-gray-600 w-1/3">Interest</span>
              <span className="flex-1 px-3 py-2 text-gray-800">Pickleball</span> {/* Hardcoded as per image */}
              <span className="ml-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.109 3.033L10 9.043l-9.043 9.043L0 20l1.957-1.957L10.957 10l-3.033-3.033z" />
                </svg>
              </span>
            </div>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm mt-4">{successMessage}</p>}

            <div className="flex justify-end space-x-4 pt-6"> {/* Align buttons to the right */}
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditLearnerProfile;