import api from './api';

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'freelancer' | 'company';
  };
}

const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/api/auth/login', {
      email,
      password
    });
    return response.data;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: 'freelancer' | 'company';
  }) => {
    const response = await api.post<AuthResponse>('/api/auth/register', data);
    return response.data;
  }
};

export default authService; 