import axios, { AxiosResponse } from 'axios';

// =======================
// TYPE DECLARATIONS
// =======================

export interface Course {
  packageId: string;
  title: string;
  price: number;
  description?: string;
  imageUrl?: string;
  // các trường khác nếu backend có trả
}

export interface Booking {
  id: string;
  learnerId: string;
  courseId: string;
  price: number;
  status: string;
  createdAt: string;
  course?: Course; // Thêm trường course có kiểu Course (có thể undefined)
}

export interface PaymentResult {
  success: boolean;
  message: string;
  transactionId: string;
}

// =======================
// API BASE URL
// =======================

const API_BASE = 'https://localhost:5001/api/learnerbooking';

// =======================
// API FUNCTIONS
// =======================

export const registerCourse = async (
  learnerId: string,
  courseId: string
): Promise<Booking> => {
  const response: AxiosResponse<{ message: string; data: Booking }> = await axios.post(`${API_BASE}/register`, {
    learnerId,
    courseId,
  });

  return response.data.data;
};

export const payCourse = async (
  bookingId: string,
  amount: number,
  method: string,
  transactionId: string,
  token: string
): Promise<PaymentResult> => {
  const response: AxiosResponse<PaymentResult> = await axios.post(
    `${API_BASE}/pay/${bookingId}`,
    {
      amount,
      method,
      transactionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getBookingById = async (bookingId: string): Promise<Booking> => {
  const response: AxiosResponse<Booking> = await axios.get(`${API_BASE}/${bookingId}`);
  return response.data;
};
