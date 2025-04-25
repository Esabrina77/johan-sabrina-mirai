import api from './api';
import { Mission } from './mission.service';

interface MissionWithScore extends Mission {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export const matchingService = {
  getSuggestions: async (): Promise<MissionWithScore[]> => {
    const response = await api.get<MissionWithScore[]>('/api/matching/suggestions');
    return response.data;
  },

  getMissionScore: async (missionId: number): Promise<{ score: number }> => {
    const response = await api.get<{ score: number }>(`/api/matching/score/${missionId}`);
    return response.data;
  }
}; 