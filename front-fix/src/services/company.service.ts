import api from './api';
import type { Mission } from './mission.service';
import type { Application } from './application.service';

export interface Company {
  id: number;
  name: string;
  email: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCompanyData {
  name?: string;
  email?: string;
  description?: string;
}

export interface DashboardStats {
  totalMissions: number;
  activeMissions: number;
  totalApplications: number;
  pendingApplications: number;
  recentApplications: Application[];
}

const companyService = {
  getProfile: async (): Promise<Company> => {
    const response = await api.get<Company>('/api/users/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateCompanyData): Promise<Company> => {
    const response = await api.put<Company>('/api/users/profile', data);
    return response.data;
  },

  getMissions: async (): Promise<Mission[]> => {
    try {
      const response = await api.get<Mission[]>('/api/missions');
      return response.data;
    } catch (error) {
      console.error('Error fetching missions:', error);
      return [];
    }
  },

  getReceivedApplications: async (): Promise<Application[]> => {
    try {
      const response = await api.get<Application[]>('/api/applications/received');
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      return [];
    }
  },

  createMission: async (data: Omit<Mission, 'id' | 'companyId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Mission> => {
    const response = await api.post<Mission>('/api/missions', {
      ...data,
      status: 'draft' // Le statut par défaut est 'draft'
    });
    return response.data;
  },

  getDashboardStats: async () => {
    try {
      const missions: Mission[] = await companyService.getMissions();
      const applications: Application[] = await companyService.getReceivedApplications();

      return {
        totalMissions: missions.length,
        totalApplications: applications.length,
        recentMissions: missions.slice(0, 5),
        recentApplications: applications.slice(0, 5)
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return {
        totalMissions: 0,
        totalApplications: 0,
        recentMissions: [],
        recentApplications: []
      };
    }
  }
};

export default companyService; 