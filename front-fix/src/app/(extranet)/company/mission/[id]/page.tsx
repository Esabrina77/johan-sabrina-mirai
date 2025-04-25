'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { use } from 'react';
import companyService from '@/services/company.service';
import { type Mission } from '@/services/mission.service';
import styles from '@/styles/extranet/company/mission-details.module.css';

export default function MissionDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const getStatusLabel = (status: Mission['status']) => {
    const labels = {
      draft: 'Brouillon',
      published: 'Publiée',
      in_progress: 'En cours',
      completed: 'Terminée'
    };
    return labels[status];
  };

  const getStatusColor = (status: Mission['status']) => {
    const colors = {
      draft: '#666',
      published: '#0066cc',
      in_progress: '#00cc66',
      completed: '#333'
    };
    return colors[status];
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error || !mission) {
    return (
      <div className={styles.error}>
        <p>{error || 'Mission non trouvée'}</p>
        <Link href="/company/missions" className={styles.backButton}>
          Retour aux missions
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/company/missions" className={styles.backLink}>
          &larr; Retour aux missions
        </Link>
        <div className={styles.titleContainer}>
          <h1>{mission.title}</h1>
          <span 
            className={styles.status}
            style={{ backgroundColor: getStatusColor(mission.status) }}
          >
            {getStatusLabel(mission.status)}
          </span>
        </div>
        {mission.status === 'draft' && (
          <Link 
            href={`/company/mission/${mission.id}/edit`}
            className={styles.editButton}
          >
            Modifier la mission
          </Link>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Description</h2>
          <p>{mission.description}</p>
        </div>

        <div className={styles.section}>
          <h2>Détails de la mission</h2>
          <div className={styles.details}>
            <div className={styles.detail}>
              <span>Catégorie:</span>
              <p>{mission.category}</p>
            </div>
            <div className={styles.detail}>
              <span>Budget:</span>
              <p>{mission.budget}€</p>
            </div>
            {mission.startDate && (
              <div className={styles.detail}>
                <span>Date de début:</span>
                <p>{new Date(mission.startDate).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
            {mission.endDate && (
              <div className={styles.detail}>
                <span>Date de fin:</span>
                <p>{new Date(mission.endDate).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
          </div>
        </div>

        {mission.requiredSkills && mission.requiredSkills.length > 0 && (
          <div className={styles.section}>
            <h2>Compétences requises</h2>
            <div className={styles.skills}>
              {mission.requiredSkills.map((skill, index) => (
                <span key={index} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {mission.status === 'published' && (
          <div className={styles.section}>
            <h2>Candidatures</h2>
            {/* TODO: Ajouter la liste des candidatures */}
            <p className={styles.noApplications}>
              Aucune candidature pour le moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 