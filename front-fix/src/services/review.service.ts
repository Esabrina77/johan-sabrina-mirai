import api from './api';

export interface Review {
  id: number;
  missionId: number;
  reviewerId: number;
  userId: number;
  rating: number;
  comment: string;
  type: 'company' | 'freelancer';
  createdAt: string;
}

interface CreateReviewData {
  missionId: number;
  userId: number;
  rating: number;
  comment: string;
  type: Review['type'];
}

export const reviewService = {
  getByUser: async (userId: number): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/api/reviews/user/${userId}`);
    return response.data;
  },

  getByMission: async (missionId: number): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/api/reviews/mission/${missionId}`);
    return response.data;
  },

  create: async (data: CreateReviewData): Promise<Review> => {
    const response = await api.post<Review>('/api/reviews', data);
    return response.data;
  }
}; 