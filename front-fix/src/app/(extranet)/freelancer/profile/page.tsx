'use client';

import { useState, useEffect } from 'react';
import freelancerService, { type Freelancer } from '@/services/freelancer.service';
import styles from '@/styles/extranet/profile.module.css';

interface DetailsFormData {
  skills?: string[];
  location?: string;
  description?: string;
  hourlyRate?: number;
  experience?: {
    years?: number;
    projects?: number;
    certifications?: number;
  };
  [key: string]: any;
}

interface FormData {
  name?: string;
  email?: string;
  details?: DetailsFormData;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await freelancerService.getProfile();
        setProfile(data);
        setFormData({
          name: data.name,
          email: data.email,
          details: {
            ...data.details
          }
        });
        console.log('Profil récupéré:', data);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDetailsChange = (field: keyof DetailsFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const updatedProfile = await freelancerService.updateProfile({
        name: formData.name,
        email: formData.email,
        details: {
          ...formData.details,
          skills: formData.details?.skills || []
        }
      });
      setProfile(updatedProfile);
      setFormData({
        name: updatedProfile.name,
        email: updatedProfile.email,
        details: {
          ...updatedProfile.details
        }
      });
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

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        skills: [...(prev.details?.skills || []), newSkill.trim()]
      }
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        skills: (prev.details?.skills || []).filter(skill => skill !== skillToRemove)
      }
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

          <div className={styles.section}>
            <h2>Compétences</h2>
            {profile.details?.skills && profile.details.skills.length > 0 ? (
              <div className={styles.skillsList}>
                {profile.details.skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            ) : (
              <p>Aucune compétence renseignée</p>
            )}
          </div>

          <div className={styles.section}>
            <h2>Localisation</h2>
            <p>{profile.details?.location || 'Non renseignée'}</p>
          </div>

          <div className={styles.section}>
            <h2>Description</h2>
            <p>{profile.details?.description || 'Non renseignée'}</p>
          </div>

          <div className={styles.section}>
            <h2>Tarif horaire</h2>
            <p>{profile.details?.hourlyRate ? profile.details.hourlyRate + ' €/h' : 'Non renseigné'}</p>
          </div>

          <div className={styles.section}>
            <h2>Expérience</h2>
            {profile.details?.experience ? (
              <ul>
                <li>Années d'expérience : {profile.details.experience.years ?? 'Non renseigné'}</li>
                <li>Projets réalisés : {profile.details.experience.projects ?? 'Non renseigné'}</li>
                <li>Certifications : {profile.details.experience.certifications ?? 'Non renseigné'}</li>
              </ul>
            ) : (
              <p>Non renseignée</p>
            )}
          </div>

          <button 
            onClick={() => {
              setIsEditing(true);
              setFormData({
                name: profile.name,
                email: profile.email,
                details: {
                  ...profile.details
                }
              });
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
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Compétences</label>
            <div className={styles.skillsInput}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Ajouter une compétence"
                className={styles.input}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className={styles.addButton}
              >
                Ajouter
              </button>
            </div>
            <div className={styles.skillsList}>
              {formData.details?.skills?.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className={styles.removeSkillButton}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Localisation</label>
            <input
              type="text"
              id="location"
              value={formData.details?.location || ''}
              onChange={(e) => handleDetailsChange('location', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.details?.description || ''}
              onChange={(e) => handleDetailsChange('description', e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: profile.name,
                  email: profile.email,
                  details: {
                    ...profile.details
                  }
                });
              }}
              className={styles.cancelButton}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 