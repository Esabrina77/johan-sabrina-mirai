import api from './api';
import type { Mission } from './mission.service';
import type { Freelancer } from './freelancer.service';
import messageService from './message.service';

export interface Application {
  id: number;
  missionId: number;
  freelancerId: number;
  status: 'sent' | 'accepted' | 'rejected';
  message?: string;
  mission?: Mission;
  freelancer?: Freelancer;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationData {
  missionId: number;
  message: string;
}

interface ConversationResponse {
  id: number;
  participants: Array<{
    id: number;
    name: string;
    role: string;
  }>;
}

const applicationService = {
  // Récupérer les candidatures envoyées par le freelancer
  getSentApplications: async (): Promise<Application[]> => {
    try {
      const response = await api.get<Application[]>('/api/applications/sent');
      return response.data;
    } catch (error) {
      console.error('Error fetching sent applications:', error);
      return [];
    }
  },

  // Récupérer les candidatures reçues par l'entreprise
  getReceivedApplications: async (): Promise<Application[]> => {
    try {
      const response = await api.get<Application[]>('/api/applications/received');
      return response.data;
    } catch (error) {
      console.error('Error fetching received applications:', error);
      return [];
    }
  },

  // Postuler à une mission
  apply: async (data: { missionId: number; message: string }): Promise<Application> => {
    try {
      const response = await api.post<Application>('/api/applications', data);
      return response.data;
    } catch (error) {
      console.error('Error applying to mission:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une candidature (entreprise uniquement)
  updateStatus: async (id: number, status: Application['status']): Promise<Application> => {
    try {
      const response = await api.patch<Application>(`/api/applications/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  create: async (data: CreateApplicationData): Promise<Application> => {
    try {
      console.log('Sending application with data:', {
        missionId: data.missionId,
        message: data.message,
        messageLength: data.message.length
      });
      
      // Créer la candidature
      const response = await api.post<Application>('/api/applications', {
        missionId: data.missionId,
        message: data.message
      });
      
      console.log('Application response:', {
        status: response.status,
        data: response.data
      });

      // Créer une conversation avec l'entreprise
      try {
        const conversationResponse = await api.post<ConversationResponse>('/api/messages/conversations', {
          missionId: data.missionId
        });

        // Envoyer le message initial
        if (conversationResponse.data.id) {
          await messageService.sendMessage({
            conversationId: conversationResponse.data.id,
            content: data.message
          });
        }
      } catch (error) {
        console.error('Error creating conversation:', error);
        // On ne bloque pas le processus si la création de la conversation échoue
      }
      
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { message: string; response?: { data: unknown; status: number } };
        console.error('Error creating application:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          details: err.response?.data
        });
      }
      throw error;
    }
  },

  getById: async (id: number): Promise<Application> => {
    const response = await api.get<Application>(`/api/applications/${id}`);
    return response.data;
  },

  getApplications: async (): Promise<Application[]> => {
    const response = await api.get<Application[]>('/api/applications/sent');
    return response.data;
  },

  getApplicationsByFreelancer: async (freelancerId: number): Promise<Application[]> => {
    const response = await api.get<Application[]>(`/api/applications/freelancer/${freelancerId}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/applications/${id}`);
  }
};

export default applicationService; 