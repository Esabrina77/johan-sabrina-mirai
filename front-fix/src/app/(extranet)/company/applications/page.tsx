'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import companyService from '@/services/company.service';
import type { Application } from '@/services/application.service';
import Loader from '@/components/Loader';
import styles from '@/styles/extranet/company/applications.module.css';
import applicationService from '@/services/application.service';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await companyService.getReceivedApplications();
        setApplications(data);
      } catch (err) {
        setError('Impossible de charger les candidatures');
        console.error('Error loading applications:', err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const getStatusBadgeClass = (status: Application['status']) => {
    const statusClasses = {
      sent: styles.statusPending,
      accepted: styles.statusAccepted,
      rejected: styles.statusRejected
    };
    return statusClasses[status] || styles.statusPending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return <Loader fullscreen />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Candidatures reçues</h1>
      
      {applications.length === 0 ? (
        <div className={styles.empty}>
          <p>Aucune candidature reçue pour le moment</p>
        </div>
      ) : (
        <div className={styles.applications}>
          {applications.map((application) => (
            <div key={application.id} className={styles.applicationCard}>
              <div className={styles.header}>
                <h2 className={styles.missionTitle}>
                  <Link href={`/company/mission/${application.missionId}`}>
                    {application.mission?.title || 'Mission non trouvée'}
                  </Link>
                </h2>
                <span className={getStatusBadgeClass(application.status)}>
                  {application.status === 'sent' ? 'En attente' : 
                   application.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                </span>
              </div>

              <div className={styles.freelancerInfo}>
                {/* <Link href={`/company/freelancer/${application.freelancerId}`} className={styles.freelancerLink}> */}
                  {application.freelancer?.name || 'Freelance'}
                {/* </Link> */}
                <span className={styles.date}>
                  Candidature reçue le {formatDate(application.createdAt)}
                </span>
              </div>

              {application.message && (
                <div className={styles.message}>
                  <p>{application.message}</p>
                </div>
              )}

              {application.status === 'sent' && (
                <div className={styles.actions}>
                  <Link 
                    href={`/company/freelancer/${application.freelancerId}`}
                    className={styles.viewButton}
                  >
                    Voir le profil du freelance
                  </Link>
                  <button
                    className={styles.acceptButton}
                    onClick={async () => {
                      try {
                        await applicationService.updateStatus(application.id, 'accepted');
                        setApplications(applications =>
                          applications.map(app =>
                            app.id === application.id ? { ...app, status: 'accepted' } : app
                          )
                        );
                      } catch (err) {
                        alert("Erreur lors de l'acceptation de la candidature");
                      }
                    }}
                  >
                    Accepter la candidature
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 