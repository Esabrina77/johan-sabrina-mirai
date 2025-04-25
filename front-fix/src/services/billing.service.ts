import api from './api';

export interface Invoice {
  id: number;
  number: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid';
  dueDate: string;
  createdAt: string;
  mission: {
    id: number;
    title: string;
    company: {
      name: string;
    };
  };
}

export const billingService = {
  getInvoices: async (year: number): Promise<Invoice[]> => {
    const response = await api.get<Invoice[]>(`/api/invoices?year=${year}`);
    return response.data;
  },

  downloadInvoice: async (invoiceId: number): Promise<void> => {
    const response = await api.get(`/api/invoices/${invoiceId}/download`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `facture-${invoiceId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  createInvoice: async (missionId: number): Promise<Invoice> => {
    const response = await api.post<Invoice>('/api/invoices', { missionId });
    return response.data;
  }
}; 