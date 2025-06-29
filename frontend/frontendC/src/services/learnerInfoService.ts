import axios from 'axios';

const API_BASE = 'https://localhost:5001/api/learnerinfo';

interface Learner {
  id: string;
  name: string;
  level: string;
  nationality: string;
  avatarUrl: string;
}

export const getLearnersByCoach = async (coachId: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE}/by-coach/${coachId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
