import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Désactivé pour le moment pour tester les appels API basiques
});

// Intercepteur simple pour le token
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Vérifier si l'erreur est due à un token invalide ou expiré
    if (error.response?.status === 401) {
      // Vérifier si on a un token
      const hasToken = !!Cookies.get('token');
      
      // Si on avait un token, c'est qu'il est expiré
      if (hasToken) {
        // Nettoyer les cookies
        Cookies.remove('token');
        Cookies.remove('user');
        
        // Stocker l'URL actuelle pour rediriger après la connexion
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
          window.location.href = '/login?expired=true';
          return Promise.reject(new Error('Session expirée'));
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api; 