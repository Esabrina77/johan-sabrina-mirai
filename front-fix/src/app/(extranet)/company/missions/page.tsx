'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import companyService from '@/services/company.service';
import type { Mission } from '@/services/mission.service';
import styles from '@/styles/extranet/company/missions.module.css';

export default function CompanyMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const data = await companyService.getMissions();
        setMissions(data);
      } catch (error) {
        console.error('Error loading missions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, []);

  const getStatusColor = (status: Mission['status']) => {
    const colors = {
      draft: '#666',
      published: '#0066cc',
      in_progress: '#00cc66',
      completed: '#333',
      cancelled: '#cc0000'
    };
    return colors[status];
  };

  if (loading) {
    return <div className={styles.loading}>Chargement des missions...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mes missions</h1>
        <Link href="/company/create-mission" className={styles.createButton}>
          Créer une mission
        </Link>
      </div>

      <div className={styles.missionsList}>
        {missions.map((mission) => (
          <div key={mission.id} className={styles.missionCard}>
            <div className={styles.missionHeader}>
              <h2>{mission.title}</h2>
              <span 
                className={styles.status}
                style={{ backgroundColor: getStatusColor(mission.status) }}
              >
                {mission.status === 'draft' && 'Brouillon'}
                {mission.status === 'published' && 'Publiée'}
                {mission.status === 'in_progress' && 'En cours'}
                {mission.status === 'completed' && 'Terminée'}
                {mission.status === 'cancelled' && 'Annulée'}
              </span>
            </div>
            
            <div className={styles.missionDetails}>
              <div className={styles.detail}>
                <span>Description:</span>
                <p>{mission.description.length > 100 
                    ? `${mission.description.substring(0, 100)}...` 
                    : mission.description}</p>
              </div>
              <div className={styles.detail}>
                <span>Budget:</span>
                <p>{mission.budget}€</p>
              </div>
              <div className={styles.detail}>
                <span>Catégorie:</span>
                <p>{mission.category}</p>
              </div>
              <div className={styles.detail}>
                <span>Date de création:</span>
                <p>{new Date(mission.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>

            <div className={styles.actions}>
              <Link 
                href={`/company/mission/${mission.id}`}
                className={styles.viewButton}
              >
                Voir les détails
              </Link>
              {mission.status === 'draft' && (
                <Link 
                  href={`/company/mission/${mission.id}/edit`}
                  className={styles.editButton}
                >
                  Modifier
                </Link>
              )}
            </div>
          </div>
        ))}

        {missions.length === 0 && (
          <div className={styles.emptyState}>
            <p>Vous n&apos;avez pas encore créé de mission</p>
            <Link href="/company/create-mission" className={styles.createButton}>
              Créer votre première mission
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 