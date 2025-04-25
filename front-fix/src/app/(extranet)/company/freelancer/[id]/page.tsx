'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import freelancerService from '@/services/freelancer.service';
import applicationService from '@/services/application.service';
import type { Freelancer } from '@/services/freelancer.service';
import type { Application } from '@/services/application.service';
import Loader from '@/components/Loader';
import styles from '@/styles/extranet/company/freelancer.module.css';

export default function FreelancerProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [freelancerData, applicationsData] = await Promise.all([
          freelancerService.getFreelancerById(parseInt(params.id)),
          applicationService.getApplicationsByFreelancer(parseInt(params.id))
        ]);
        setFreelancer(freelancerData);
        setApplications(applicationsData);
      } catch (err) {
        setError('Impossible de charger les informations du freelance');
        console.error('Error loading freelancer:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.id]);

  const handleApplicationUpdate = async (applicationId: number, status: 'accepted' | 'rejected') => {
    try {
      setUpdating(true);
      await applicationService.update(applicationId, status);
      
      // Mettre à jour la liste des applications
      const updatedApplications = applications.map(app => 
        app.id === applicationId ? { ...app, status } : app
      );
      setApplications(updatedApplications);
    } catch (err) {
      setError('Impossible de mettre à jour la candidature');
      console.error('Error updating application:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loader fullscreen />;
  }

  if (error || !freelancer) {
    return <div className={styles.error}>{error || 'Freelance non trouvé'}</div>;
  }

  const pendingApplications = applications.filter(app => app.status === 'sent');

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        ← Retour
      </button>

      <div className={styles.profile}>
        <div className={styles.header}>
          <h1 className={styles.name}>{freelancer.name}</h1>
          {freelancer.title && (
            <p className={styles.title}>{freelancer.title}</p>
          )}
        </div>

        {freelancer.description && (
          <div className={styles.section}>
            <h2>À propos</h2>
            <p>{freelancer.description}</p>
          </div>
        )}

        {freelancer.skills && freelancer.skills.length > 0 && (
          <div className={styles.section}>
            <h2>Compétences</h2>
            <div className={styles.skills}>
              {freelancer.skills.map((skill, index) => (
                <span key={index} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {pendingApplications.length > 0 && (
          <div className={styles.applications}>
            <h2>Candidatures en attente</h2>
            {pendingApplications.map(application => (
              <div key={application.id} className={styles.applicationCard}>
                <div className={styles.applicationHeader}>
                  <h3>{application.mission?.title}</h3>
                  <span className={styles.date}>
                    {new Date(application.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {application.message && (
                  <p className={styles.message}>{application.message}</p>
                )}

                <div className={styles.actions}>
                  <button
                    onClick={() => handleApplicationUpdate(application.id, 'accepted')}
                    className={styles.acceptButton}
                    disabled={updating}
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleApplicationUpdate(application.id, 'rejected')}
                    className={styles.rejectButton}
                    disabled={updating}
                  >
                    Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 