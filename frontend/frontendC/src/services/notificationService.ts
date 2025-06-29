// services/notificationService.ts
import axios from "axios";
import { NotificationDto } from "../types/notification"; // hoặc chỉnh lại đúng path của bạn

const API_BASE = "https://localhost:5001/api/notification";

export const getNotifications = async (): Promise<NotificationDto[]> => {
  try {
    const response = await axios.get<NotificationDto[]>(API_BASE);
    console.log("📦 Notifications fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gọi getNotifications:", error);
    throw error;
  }
};


export const markAsRead = async (notificationId: string): Promise<void> => {
  await axios.put(`${API_BASE}/markread/${notificationId}`);
};
