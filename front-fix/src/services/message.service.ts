import api from './api';

export interface Message {
  id: number;
  content: string;
  senderId: number;
  conversationId: number;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: number;
  participants: Array<{
    id: number;
    name: string;
  }>;
  lastMessage?: Message;
  unreadCount: number;
}

const messageService = {
  // Récupérer les conversations de l'utilisateur
  getConversations: async (): Promise<Conversation[]> => {
    try {
      const response = await api.get<Conversation[]>('/api/messages/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  },

  // Récupérer les messages d'une conversation
  getConversationMessages: async (conversationId: number): Promise<Message[]> => {
    try {
      const response = await api.get<Message[]>(`/api/messages/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  // Envoyer un message
  sendMessage: async (data: { conversationId: number; content: string }): Promise<Message> => {
    try {
      const response = await api.post<Message>('/api/messages', data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Marquer les messages comme lus
  markAsRead: async (conversationId: number): Promise<void> => {
    try {
      await api.put(`/api/messages/conversations/${conversationId}/read`);
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }
};

export default messageService; 