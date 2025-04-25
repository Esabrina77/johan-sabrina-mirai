'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/extranet/company/dashboard.module.css';
import companyService from '@/services/company.service';
import type { DashboardStats } from '@/services/company.service';

export default function CompanyDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const dashboardStats = await companyService.getDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
        setError('Impossible de charger les statistiques');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!stats) return <div className={styles.error}>Aucune donnée disponible</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tableau de bord</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Missions totales</h3>
          <p className={styles.statNumber}>{stats.totalMissions}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Candidatures reçues</h3>
          <p className={styles.statNumber}>{stats.totalApplications}</p>
        </div>
      </div>

      <div className={styles.recentSection}>
        <h2>Dernières candidatures</h2>
        {stats.recentApplications.length > 0 ? (
          <div className={styles.applicationsList}>
            {stats.recentApplications.map((application) => (
              <div key={application.id} className={styles.applicationCard}>
                <div className={styles.applicationHeader}>
                  <h4>{application.mission?.title || 'Mission sans titre'}</h4>
                  <span className={styles.status}>{application.status}</span>
                </div>
                <p className={styles.applicantName}>
                  {application.freelancer?.name || 'Freelance'}
                </p>
                <p className={styles.applicationDate}>
                  {new Date(application.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noData}>Aucune candidature récente</p>
        )}
      </div>

      <div className={styles.quickLinks}>
        <Link href="/company/missions" className={styles.quickLink}>
          <h3>Gérer les missions</h3>
          <p>Consultez et gérez vos missions en cours et passées</p>
        </Link>
        <Link href="/company/applications" className={styles.quickLink}>
          <h3>Gérer les candidatures</h3>
          <p>Examinez les candidatures reçues pour vos missions</p>
        </Link>
        <Link href="/company/profile" className={styles.quickLink}>
          <h3>Profil entreprise</h3>
          <p>Mettez à jour les informations de votre entreprise</p>
        </Link>
      </div>
    </div>
  );
} 