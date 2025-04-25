'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import applicationService, { type Application } from '@/services/application.service';
import styles from '@/styles/extranet/dashboard.module.css';

export default function FreelancerDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0
  });

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await applicationService.getApplications();
        setApplications(data);
      } catch (err) {
        console.error('Error loading applications:', err);
        setError('Erreur lors du chargement des candidatures');
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const applications = await applicationService.getApplications();
        setStats({
          totalApplications: applications.length,
          pendingApplications: applications.filter(app => app.status === 'sent').length,
          acceptedApplications: applications.filter(app => app.status === 'accepted').length
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    };

    loadApplications();
    fetchStats();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Tableau de bord</h1>
      <p className={styles.welcome}>Bienvenue, {user?.name}</p>
      
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total</h3>
          <p>{stats.totalApplications}</p>
        </div>
        <div className={styles.statCard}>
          <h3>En attente</h3>
          <p>{stats.pendingApplications}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Acceptées</h3>
          <p>{stats.acceptedApplications}</p>
        </div>
      </div>

      <section className={styles.applications}>
        <h2>Mes candidatures récentes</h2>
        {applications.length > 0 ? (
          <div className={styles.applicationsList}>
            {applications.map((application) => (
              <div key={application.id} className={styles.applicationCard}>
                <h3>{application.mission?.title}</h3>
                <p className={styles.status}>Statut: {application.status}</p>
                <p className={styles.date}>
                  Postuté le: {new Date(application.createdAt).toLocaleDateString('fr-FR')}
                </p>
                <Link href={`/freelancer/applications/${application.id}`} className={styles.viewButton}>
                  Voir les détails
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noApplications}>Vous n'avez pas encore de candidatures</p>
        )}
      </section>
    </div>
  );
} 