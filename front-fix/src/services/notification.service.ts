import api from './api';

export interface Notification {
  id: number;
  type: 'application' | 'message' | 'payment' | 'system';
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>('/api/notifications');
    return response.data;
  },

  markAsRead: async (notificationId: number): Promise<void> => {
    await api.put(`/api/notifications/${notificationId}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await api.put('/api/notifications/read-all');
  }
}; 