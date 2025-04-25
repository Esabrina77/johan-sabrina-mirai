import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import authService, { type AuthResponse } from '@/services/auth.service';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: 'freelancer' | 'company';
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    const savedUser = Cookies.get('user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        Cookies.remove('token');
        Cookies.remove('user');
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      Cookies.set('token', response.token);
      Cookies.set('user', JSON.stringify(response.user));
      setUser(response.user);
      router.push(response.user.role === 'freelancer' ? '/freelancer/dashboard' : '/company/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Email ou mot de passe incorrect');
    }
  };

  const register = async (data: { name: string; email: string; password: string; role: 'freelancer' | 'company' }) => {
    try {
      const response = await authService.register(data);
      Cookies.set('token', response.token);
      Cookies.set('user', JSON.stringify(response.user));
      setUser(response.user);
      router.push(data.role === 'freelancer' ? '/freelancer/dashboard' : '/company/dashboard');
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Erreur lors de l\'inscription');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}; 