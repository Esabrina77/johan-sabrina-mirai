'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/extranet/applications.module.css';

export default function ApplicationConfirmation() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/freelancer/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.confirmationContent}>
        <h2>Candidature envoyée avec succès !</h2>
        <p>Votre candidature a bien été transmise à l&apos;entreprise.</p>
        <p>Vous allez être redirigé vers votre tableau de bord dans quelques secondes...</p>
      </div>
    </div>
  );
} 