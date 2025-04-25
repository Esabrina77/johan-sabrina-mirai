import api from './api';
import type { Mission } from './mission.service';
import type { Application } from './application.service';

export interface Freelancer {
  id: number;
  name: string;
  email: string;
  title?: string;
  description?: string;
  skills?: string[];
  hourlyRate?: number;
  availability?: 'available' | 'busy' | 'unavailable';
  createdAt: string;
  updatedAt: string;
}

export interface UpdateFreelancerData {
  name?: string;
  email?: string;
  title?: string;
  description?: string;
  skills?: string[];
  hourlyRate?: number;
  availability?: 'available' | 'busy' | 'unavailable';
}

const freelancerService = {
  getProfile: async (): Promise<Freelancer> => {
    const response = await api.get<Freelancer>('/api/users/profile');
    return response.data;
  },

  getFreelancerById: async (id: number): Promise<Freelancer> => {
    const response = await api.get<Freelancer>(`/api/users/${id}`);
    return response.data;
  },

  updateProfile: async (data: UpdateFreelancerData): Promise<Freelancer> => {
    const response = await api.put<Freelancer>('/api/users/profile', data);
    return response.data;
  },

  getMissions: async (): Promise<Mission[]> => {
    const response = await api.get<Mission[]>('/api/missions');
    return response.data;
  },

  getApplications: async (): Promise<Application[]> => {
    const response = await api.get<Application[]>('/api/applications');
    return response.data;
  }
};

export default freelancerService; 