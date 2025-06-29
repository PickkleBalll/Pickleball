import axios from 'axios';

const API_URL = 'https://localhost:5001/api/learnervideo';

export const uploadLearnerVideo = async (learnerId: string, file: File) => {
  const formData = new FormData();
  formData.append("LearnerId", learnerId);
  formData.append("File", file);
  formData.append("Description", "Test mô tả");

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};




export const getLearnerVideos = async (learnerId: string) => {
  const response = await axios.get(`${API_URL}/learner/${learnerId}`);
  return response.data;
};
