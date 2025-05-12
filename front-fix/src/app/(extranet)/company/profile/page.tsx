'use client';

import { useState, useEffect } from 'react';
import companyService, { type Company } from '@/services/company.service';
import styles from '@/styles/extranet/company/profile.module.css';

export default function CompanyProfile() {
  const [profile, setProfile] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await companyService.getProfile();
        setProfile(data);
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
    if (name.startsWith('socialMedia.')) {
      const platform = name.split('.')[1];
      setProfile(prev => prev ? {
        ...prev,
        details: {
          ...prev.details,
          socialMedia: {
            ...prev.details?.socialMedia,
            [platform]: value
          }
        }
      } : null);
    } else {
      setProfile(prev => prev ? {
        ...prev,
        details: {
          ...prev.details,
          [name]: value
        }
      } : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const updatedProfile = await companyService.updateProfile({
        name: profile.name,
        email: profile.email,
        details: {
          ...profile.details
        }
      });
      setProfile(updatedProfile);
      setIsEditing(false);
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

  if (!isEditing) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Profil de l&apos;entreprise</h1>
        <div className={styles.card}>
          <div className={styles.section}>
            <h2>Informations générales</h2>
            <p><strong>Nom :</strong> {profile.name}</p>
            <p><strong>Email :</strong> {profile.email}</p>
            <p><strong>Description :</strong> {profile.details?.description || 'Non renseignée'}</p>
            <p><strong>Site web :</strong> {profile.details?.website || 'Non renseigné'}</p>
            <p><strong>Localisation :</strong> {profile.details?.location || 'Non renseignée'}</p>
            <p><strong>Taille :</strong> {profile.details?.size || 'Non renseignée'}</p>
            <p><strong>Secteur d&apos;activité :</strong> {profile.details?.industry || 'Non renseigné'}</p>
            <p><strong>Année de création :</strong> {profile.details?.foundedYear || 'Non renseignée'}</p>
            <p><strong>Siège social :</strong> {profile.details?.headquarters || 'Non renseigné'}</p>
            <p><strong>Statut juridique :</strong> {profile.details?.legalStatus || 'Non renseigné'}</p>
          </div>
          <div className={styles.section}>
            <h2>Spécialités</h2>
            {profile.details?.specialties && profile.details.specialties.length > 0 ? (
              <div className={styles.tagsList}>
                {profile.details.specialties.map((specialty, idx) => (
                  <span key={idx} className={styles.tag}>{specialty}</span>
                ))}
              </div>
            ) : (
              <p>Aucune spécialité renseignée</p>
            )}
          </div>
          <div className={styles.section}>
            <h2>Réseaux sociaux</h2>
            <p><strong>LinkedIn :</strong> {profile.details?.socialMedia?.linkedin || 'Non renseigné'}</p>
            <p><strong>Twitter :</strong> {profile.details?.socialMedia?.twitter || 'Non renseigné'}</p>
            <p><strong>Facebook :</strong> {profile.details?.socialMedia?.facebook || 'Non renseigné'}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            Modifier
          </button>
        </div>
      </div>
    );
  }

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
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={profile.details?.description || ''}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="website">Site web</label>
          <input
            type="url"
            id="website"
            name="website"
            value={profile.details?.website || ''}
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
            value={profile.details?.location || ''}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="size">Taille de l&apos;entreprise</label>
          <select
            id="size"
            name="size"
            value={profile.details?.size || ''}
            onChange={handleChange}
            className={styles.select}
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
            value={profile.details?.industry || ''}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="foundedYear">Année de création</label>
          <input
            type="number"
            id="foundedYear"
            name="foundedYear"
            value={profile.details?.foundedYear || ''}
            onChange={handleChange}
            className={styles.input}
            min="1800"
            max={new Date().getFullYear()}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="headquarters">Siège social</label>
          <input
            type="text"
            id="headquarters"
            name="headquarters"
            value={profile.details?.headquarters || ''}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="legalStatus">Statut juridique</label>
          <input
            type="text"
            id="legalStatus"
            name="legalStatus"
            value={profile.details?.legalStatus || ''}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <h3>Réseaux sociaux</h3>
          <div className={styles.socialMediaInputs}>
            <div className={styles.socialMediaInput}>
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                type="url"
                id="linkedin"
                name="socialMedia.linkedin"
                value={profile.details?.socialMedia?.linkedin || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://linkedin.com/company/"
              />
            </div>
            <div className={styles.socialMediaInput}>
              <label htmlFor="twitter">Twitter</label>
              <input
                type="url"
                id="twitter"
                name="socialMedia.twitter"
                value={profile.details?.socialMedia?.twitter || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://twitter.com/"
              />
            </div>
            <div className={styles.socialMediaInput}>
              <label htmlFor="facebook">Facebook</label>
              <input
                type="url"
                id="facebook"
                name="socialMedia.facebook"
                value={profile.details?.socialMedia?.facebook || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://facebook.com/"
              />
            </div>
          </div>
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