import api from './api';
import type { Mission } from './mission.service';
import type { Application } from './application.service';

export interface Freelancer {
  id: number;
  name: string;
  email: string;
  role: 'freelancer';
  details?: {
    skills?: string[];
    location?: string;
  description?: string;
  hourlyRate?: number;
    experience?: {
      years?: number;
      projects?: number;
      certifications?: number;
    };
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateFreelancerData {
  name?: string;
  email?: string;
  details?: {
  skills?: string[];
  };
}

const freelancerService = {
  getProfile: async (): Promise<Freelancer> => {
    const response = await api.get('/api/users/profile');
    const data = response.data as any;
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      details: data.profile?.details || {},
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },

  getFreelancerById: async (id: number): Promise<Freelancer> => {
    const response = await api.get<Freelancer>(`/api/users/${id}`);
    return response.data;
  },

  updateProfile: async (data: UpdateFreelancerData): Promise<Freelancer> => {
    const response = await api.put('/api/users/profile', data);
    const resData = response.data as any;
    return {
      id: resData.id,
      name: resData.name,
      email: resData.email,
      role: resData.role,
      details: resData.profile?.details || {},
      createdAt: resData.createdAt,
      updatedAt: resData.updatedAt,
    };
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