'use client';

import { useState, useEffect } from 'react';
import companyService, { type Company } from '@/services/company.service';
import styles from '@/styles/extranet/company/profile.module.css';

type UpdateableFields = Omit<Company, 'id' | 'createdAt' | 'updatedAt'>;

export default function CompanyProfile() {
  const [profile, setProfile] = useState<UpdateableFields | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await companyService.getProfile();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, createdAt, updatedAt, ...updateableFields } = data;
        setProfile(updateableFields);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      await companyService.updateProfile(profile);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return <div className={styles.error}>Profil non trouvé</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profil de l&apos;entreprise</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nom de l&apos;entreprise</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={profile.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="website">Site web</label>
          <input
            type="url"
            id="website"
            name="website"
            value={profile.website || ''}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Localisation</label>
          <input
            type="text"
            id="location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="size">Taille de l&apos;entreprise</label>
          <select
            id="size"
            name="size"
            value={profile.size}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Sélectionnez une taille</option>
            <option value="1-10">1-10 employés</option>
            <option value="11-50">11-50 employés</option>
            <option value="51-200">51-200 employés</option>
            <option value="201-500">201-500 employés</option>
            <option value="501+">501+ employés</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="industry">Secteur d&apos;activité</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={profile.industry}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
} 