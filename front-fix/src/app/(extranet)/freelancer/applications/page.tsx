'use client';

import { useState, useEffect } from 'react';
import applicationService, { type Application } from '@/services/application.service';
import styles from '@/styles/extranet/applications.module.css';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getSentApplications();
        setApplications(data);
      } catch (err) {
        setError('Erreur lors du chargement des candidatures');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusBadgeStyle = (status: Application['status']) => {
    switch (status) {
      case 'sent':
        return styles.statusPending;
      case 'accepted':
        return styles.statusAccepted;
      case 'rejected':
        return styles.statusRejected;
      default:
        return '';
    }
  };

  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case 'sent':
        return 'En attente';
      case 'accepted':
        return 'Acceptée';
      case 'rejected':
        return 'Refusée';
      default:
        return status;
    }
  };

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  // Log pour debug : voir les statuts reçus
  console.log('Applications reçues:', applications);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mes candidatures</h1>

      <div className={styles.applicationsGrid}>
        {applications.length === 0 ? (
          <p className={styles.emptyMessage}>Vous n'avez pas encore envoyé de candidature.</p>
        ) : (
          applications.map((application) => (
            <div key={application.id} className={styles.applicationCard}>
              <h2 className={styles.missionTitle}>
                {application.mission?.title || 'Mission inconnue'}
              </h2>
              <div className={styles.applicationDetails}>
                <span className={`${styles.statusBadge} ${getStatusBadgeStyle(application.status)}`}>
                  {getStatusLabel(application.status)}
                </span>
                <p className={styles.date}>
                  Envoyée le {new Date(application.createdAt).toLocaleDateString('fr-FR')}
                </p>
                {application.message && (
                  <p className={styles.message}>
                    Message: {application.message}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 