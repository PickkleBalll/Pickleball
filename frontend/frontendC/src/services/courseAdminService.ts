// services/courseAdminService.ts
import axios from "axios";

const BASE_URL = "https://localhost:5001/api/CoursePackage";
const COACH_URL = "https://localhost:5001/api/CoachProfiles"; // <-- thêm URL này

export const getAllCourses = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const createCourse = async (data: any) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateCourse = async (id: string, data: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};

export const getAllCoaches = async () => {
  const res = await axios.get(COACH_URL);
  return res.data;
};
