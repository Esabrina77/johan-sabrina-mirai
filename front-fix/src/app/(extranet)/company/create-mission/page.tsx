'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import companyService from '@/services/company.service';
import styles from '@/styles/extranet/company/create-mission.module.css';

export default function CreateMission() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    requiredSkills: [] as string[],
  });
  const [skill, setSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await companyService.createMission({
        ...formData,
        budget: parseFloat(formData.budget),
      });
      router.push('/company/missions');
    } catch (err) {
      setError('Une erreur est survenue lors de la création de la mission.');
      console.error('Error creating mission:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addSkill = () => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
      setSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skillToRemove)
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Créer une nouvelle mission</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Titre de la mission *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ex: Développement d'une application mobile"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description détaillée *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Décrivez les objectifs, les livrables attendus et la durée estimée de la mission..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Catégorie *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
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
            value={formData.budget}
            onChange={handleChange}
            required
            min="0"
            step="100"
            placeholder="Ex: 5000"
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
            {formData.requiredSkills.map((s, index) => (
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
            disabled={loading}
          >
            {loading ? 'Création...' : 'Créer la mission'}
          </button>
        </div>
      </form>
    </div>
  );
} 