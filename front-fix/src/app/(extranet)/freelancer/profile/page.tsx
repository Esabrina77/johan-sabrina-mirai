'use client';

import { useState, useEffect } from 'react';
import freelancerService, { type Freelancer } from '@/services/freelancer.service';
import styles from '@/styles/extranet/profile.module.css';

interface FormData {
  name?: string;
  email?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await freelancerService.getProfile();
        setProfile(data);
        setFormData({});
      } catch (err) {
        setError('Erreur lors du chargement du profil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || Object.keys(formData).length === 0) return;

    try {
      const updatedProfile = await freelancerService.updateProfile(formData);
      setProfile(updatedProfile);
      setFormData({});
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
      console.error(err);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return <div className={styles.error}>Profil non trouvé</div>;

  if (!isEditing) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Mon Profil</h1>

        <div className={styles.card}>
          <div className={styles.section}>
            <h2>Informations personnelles</h2>
            <p>Nom: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Rôle: {profile.role === 'freelancer' ? 'Freelance' : profile.role}</p>
          </div>

          <button 
            onClick={() => {
              setIsEditing(true);
              setFormData({});
            }}
            className={styles.editButton}
          >
            Modifier mon profil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modifier mon profil</h1>

      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              defaultValue={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              defaultValue={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={Object.keys(formData).length === 0}
            >
              Enregistrer
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => {
                setIsEditing(false);
                setFormData({});
              }}
            >Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 