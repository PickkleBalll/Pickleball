import axios from 'axios';

const API_URL = 'https://localhost:5001/api/publiccourse';

export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data;
};

export const getCoursesByCoach = async (coachId: string) => {
  const response = await axios.get(`${API_URL}/coach/${coachId}/courses`);
  return response.data;
};
