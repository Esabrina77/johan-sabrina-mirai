'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/site/auth.module.css';

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
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.authHeader}>
          <h2 className={styles.authTitle}>Inscription</h2>
          <p className={styles.authSubtitle}>
            Créez votre compte pour accéder à nos services
          </p>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              required
              className={styles.inputField}
              placeholder="Nom complet"
              minLength={2}
            />
            <input
              type="email"
              name="email"
              required
              className={styles.inputField}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              required
              className={styles.inputField}
              placeholder="Mot de passe"
              minLength={6}
            />
            <select
              name="role"
              required
              className={styles.inputField}
              defaultValue=""
            >
              <option value="" disabled>Sélectionnez votre rôle</option>
              <option value="company">Entreprise</option>
              <option value="freelancer">Freelance</option>
            </select>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <div className={styles.switchLink}>
          Déjà un compte ?{' '}
          <Link href="/login">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
} 