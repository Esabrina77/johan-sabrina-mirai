'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import './login.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-futuristic-bg">
      <div className="auth-card">
        <h1 className="auth-title">Connexion</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <div className="auth-links">
          <a href="/register">Créer un compte</a>
       
        </div>
      </div>
    </div>
  );
} 