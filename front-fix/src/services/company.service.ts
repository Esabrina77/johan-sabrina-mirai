import api from './api';
import type { Mission } from './mission.service';
import type { Application } from './application.service';

export interface Company {
  id: number;
  name: string;
  email: string;
  role: 'company';
  details?: {
    website?: string;
    location?: string;
  description?: string;
    specialties?: string[];
    foundedYear?: number;
    headquarters?: string;
    size?: string;
    industry?: string;
    socialMedia?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      [key: string]: any;
    };
    legalStatus?: string;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateCompanyData {
  name?: string;
  email?: string;
  details?: {
    website?: string;
    location?: string;
  description?: string;
    specialties?: string[];
    foundedYear?: number;
    headquarters?: string;
    size?: string;
    industry?: string;
    socialMedia?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      [key: string]: any;
    };
    legalStatus?: string;
    [key: string]: any;
  };
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
    const response = await api.get('/api/users/profile');
    const data = response.data as any;
    return {
      ...data,
      details: data.profile?.details || {},
    };
  },

  updateProfile: async (data: UpdateCompanyData): Promise<Company> => {
    const response = await api.put('/api/users/profile', data);
    const resData = response.data as any;
    return {
      ...resData,
      details: resData.profile?.details || {},
    };
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