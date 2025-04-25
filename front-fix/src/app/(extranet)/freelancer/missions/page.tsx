'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import missionService, { type Mission } from '@/services/mission.service';
import styles from '@/styles/extranet/missions.module.css';

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMissions = async () => {
    try {
      setLoading(true);
      const missions = await missionService.getAllMissions();
      setMissions(missions);
    } catch (error) {
      console.error('Error loading missions:', error);
      setError('Impossible de charger les missions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMissions();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Chargement des missions...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Missions disponibles</h1>
      </div>

      <div className={styles.missionGrid}>
        {missions.map((mission: Mission) => (
          <div key={`mission-${mission.id}`} className={styles.missionCard}>
            <div className={styles.missionHeader}>
              <h2>{mission.title}</h2>
            </div>
            <p className={styles.description}>
              {mission.description.length > 150
                ? `${mission.description.substring(0, 150)}...`
                : mission.description}
            </p>
            <div className={styles.missionDetails}>
              <span>Budget: {mission.budget}€</span>
              <p className={styles.category}>
                <span>Catégorie:</span> {mission.category}
              </p>
            </div>
            <div className={styles.missionFooter}>
              <Link href={`/freelancer/mission/${mission.id}`} className={styles.viewButton}>
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
        {missions.length === 0 && (
          <div className={styles.noMissions}>
            <p>Aucune mission disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
} 