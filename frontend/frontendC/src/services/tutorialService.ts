// src/services/tutorialService.ts
import axios, { AxiosResponse } from 'axios';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  coachId: string;
  createdAt: string;
}

const API_BASE = 'https://localhost:5001/api/tutorial';

// Lấy token từ localStorage
const getToken = (): string => localStorage.getItem('token') || '';

// Cấu hình header với Authorization
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Dto dùng cho tạo tutorial
export interface CreateTutorialDto {
  title: string;
  description: string;
  videoUrl: string;
}

// Dto dùng cho cập nhật tutorial
export interface UpdateTutorialDto {
  title: string;
  description: string;
  videoUrl: string;
}

// CREATE tutorial
export const createTutorial = async (
  dto: CreateTutorialDto
): Promise<Tutorial> => {
  const response: AxiosResponse<Tutorial> = await axios.post(
    API_BASE,
    dto,
    authHeaders()
  );
  return response.data;
};

export const getTutorials = async (): Promise<Tutorial[]> => {
  const response: AxiosResponse<Tutorial[]> = await axios.get(API_BASE, authHeaders());
  return response.data;
};



// UPDATE tutorial
export const updateTutorial = async (
  id: string,
  dto: UpdateTutorialDto
): Promise<Tutorial> => {
  const response: AxiosResponse<Tutorial> = await axios.put(
    `${API_BASE}/${id}`,
    dto,
    authHeaders()
  );
  return response.data;
};

// DELETE tutorial
export const deleteTutorial = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`, authHeaders());
};
