'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import './register.css';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: formData.get('role') as 'freelancer' | 'company'
    };

    try {
      await register(userData);
      if (userData.role === 'freelancer') {
        router.push('/freelancer/dashboard');
      } else {
        router.push('/company/dashboard');
      }
    } catch {
      setError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-futuristic-bg">
      <div className="auth-card">
        <h2 className="auth-title">Inscription</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            required
            placeholder="Nom complet"
            minLength={2}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Mot de passe"
            minLength={6}
          />
          <select
            name="role"
            required
            defaultValue=""
          >
            <option value="" disabled>Sélectionnez votre rôle</option>
            <option value="company">Entreprise</option>
            <option value="freelancer">Freelance</option>
          </select>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>
        <div className="auth-links">
          <Link href="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
} 