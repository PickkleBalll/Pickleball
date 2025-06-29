import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CoachFormData {
  fullName: string;
  specialty: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
}

const EditCoachProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CoachFormData>({
    fullName: "",
    specialty: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("coachId");
      if (!userId) return;

      try {
        const res = await axios.get(`https://localhost:5001/api/CoachProfiles/by-user/${userId}`);
        setFormData(res.data as CoachFormData);
      } catch (err) {
        console.error(err);
        setError("Không thể tải thông tin hồ sơ.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const userId = localStorage.getItem("coachId");
    if (!userId) {
      setError("Không tìm thấy thông tin user.");
      return;
    }

    try {
      await axios.put(`https://localhost:5001/api/CoachProfiles/by-user/${userId}`, formData);
      setSuccessMessage("Cập nhật thành công!");
      setTimeout(() => navigate("/coach/profile"), 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Cập nhật thất bại.");
    }
  };

   return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-[30px] shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh sửa hồ sơ huấn luyện viên</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Giới tính</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Chuyên môn</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Ngày sinh</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/coach/profile")}
            className="px-6 py-2 bg-gray-300 text-black rounded-xl"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-xl"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCoachProfile;
