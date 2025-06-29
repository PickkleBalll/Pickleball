// src/services/learnerService.ts
import axios from 'axios';

const API_URL = 'https://localhost:5001/api/learnerprofiles';

// src/services/learnerService.ts
export interface Learner {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  // thêm các field khác nếu cần
}

export const getLearnerByUserId = async (userId: string): Promise<Learner> => {
  const response = await axios.get<Learner>(`${API_URL}/by-user/${userId}`);
  return response.data;
};



export const updateLearnerProfile = async (data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}) => {
  const token = localStorage.getItem('token');

  const res = await axios.put(`${API_URL}/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


