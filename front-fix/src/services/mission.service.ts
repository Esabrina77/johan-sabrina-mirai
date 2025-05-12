import api from './api';

export interface Mission {
  id: number;
  title: string;
  description: string;
  companyId: number;
  budget: number;
  category: string;
  status: 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled';
  requiredSkills?: string[];
  createdAt: string;
  updatedAt: string;
  company?: {
    id: number;
    name: string;
  };
}

const missionService = {
  // Récupérer toutes les missions (publiques)
  getAllMissions: async (): Promise<Mission[]> => {
    try {
      const response = await api.get<Mission[]>('/api/missions');
      return response.data;
    } catch (error) {
      console.error('Error fetching missions:', error);
      return [];
    }
  },

  // Récupérer une mission par son ID
  getMissionById: async (id: number): Promise<Mission | null> => {
    try {
      const response = await api.get<Mission>(`/api/missions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mission:', error);
      return null;
    }
  },

  // Créer une nouvelle mission (entreprise uniquement)
  createMission: async (data: Omit<Mission, 'id' | 'companyId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Mission> => {
    try {
      const response = await api.post<Mission>('/api/missions', data);
      return response.data;
    } catch (error) {
      console.error('Error creating mission:', error);
      throw error;
    }
  },

  // Mettre à jour une mission (entreprise uniquement)
  updateMission: async (id: number, data: Partial<Mission>): Promise<Mission> => {
    try {
      const response = await api.patch<Mission>(`/api/missions/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating mission:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une mission (entreprise uniquement)
  updateMissionStatus: async (id: number, status: Mission['status']): Promise<Mission> => {
    try {
      const response = await api.patch<Mission>(`/api/missions/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating mission status:', error);
      throw error;
    }
  },

  // Supprimer une mission (entreprise uniquement)
  deleteMission: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/missions/${id}`);
    } catch (error) {
      console.error('Error deleting mission:', error);
      throw error;
    }
  }
};

export default missionService; 