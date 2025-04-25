import api from './api';

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  updatedAt: string;
}

interface CreateTicketData {
  subject: string;
  message: string;
}

export interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export const supportService = {
  async getTickets(): Promise<Ticket[]> {
    const response = await api.get<Ticket[]>('/api/tickets');
    return response.data;
  },

  async getTicket(id: number): Promise<Ticket> {
    const response = await api.get<Ticket>(`/api/tickets/${id}`);
    return response.data;
  },

  async createTicket(data: SupportTicket | CreateTicketData): Promise<Ticket | void> {
    if ('name' in data) {
      return api.post('/support/tickets', data);
    }
    const response = await api.post<Ticket>('/api/tickets', data);
    return response.data;
  },

  async updateTicket(id: number, data: Partial<CreateTicketData>): Promise<Ticket> {
    const response = await api.patch<Ticket>(`/api/tickets/${id}`, data);
    return response.data;
  },

  async closeTicket(id: number): Promise<Ticket> {
    const response = await api.post<Ticket>(`/api/tickets/${id}/close`);
    return response.data;
  }
}; 