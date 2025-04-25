'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { companyService } from '@/services/company.service';
import styles from '@/styles/extranet/company/create-mission.module.css';

interface Mission {
  id: number;
  title: string;
  description: string;
  budget: number;
  category: string;
  requiredSkills: string[];
  status: 'draft' | 'published' | 'in_progress' | 'completed';
  startDate?: string;
  endDate?: string;
}

export default function EditMission({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [skill, setSkill] = useState('');

  useEffect(() => {
    const loadMission = async () => {
      try {
        const missions = await companyService.getMissions() as Mission[];
        const mission = missions.find(m => m.id === parseInt(resolvedParams.id));
        if (mission) {
          setMission(mission);
        } else {
          setError('Mission non trouvée');
        }
      } catch (err) {
        setError('Impossible de charger les détails de la mission');
        console.error('Error loading mission:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMission();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission) return;

    setSaving(true);
    setError('');

    try {
      // Temporarily just redirect back to mission details
      router.push(`/company/mission/${resolvedParams.id}`);
    } catch (err) {
      setError('Erreur lors de la sauvegarde de la mission');
      console.error('Error saving mission:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!mission) return;
    
    setMission(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const addSkill = () => {
    if (!mission || !skill || mission.requiredSkills.includes(skill)) return;
    
    setMission(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      };
    });
    setSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    if (!mission) return;
    
    setMission(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        requiredSkills: prev.requiredSkills.filter(s => s !== skillToRemove)
      };
    });
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error && !mission) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <Link href="/company/missions" className={styles.backButton}>
          Retour aux missions
        </Link>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className={styles.error}>
        <p>Mission non trouvée</p>
        <Link href="/company/missions" className={styles.backButton}>
          Retour aux missions
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={`/company/mission/${mission.id}`} className={styles.backLink}>
          &larr; Retour aux détails
        </Link>
        <h1>Modifier la mission</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Titre de la mission *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={mission.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description détaillée *</label>
          <textarea
            id="description"
            name="description"
            value={mission.description}
            onChange={handleChange}
            required
            rows={6}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Catégorie *</label>
          <select
            id="category"
            name="category"
            value={mission.category}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="development">Développement</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="writing">Rédaction</option>
            <option value="consulting">Consulting</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="budget">Budget (€) *</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={mission.budget}
            onChange={handleChange}
            required
            min="0"
            step="100"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="skills">Compétences requises</label>
          <div className={styles.skillsInput}>
            <input
              type="text"
              id="skills"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Ajouter une compétence"
            />
            <button type="button" onClick={addSkill} className={styles.addSkillButton}>
              Ajouter
            </button>
          </div>
          <div className={styles.skillsList}>
            {mission.requiredSkills.map((s, index) => (
              <span key={index} className={styles.skillTag}>
                {s}
                <button type="button" onClick={() => removeSkill(s)}>&times;</button>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => router.back()} 
            className={styles.cancelButton}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={saving}
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </form>
    </div>
  );
} 