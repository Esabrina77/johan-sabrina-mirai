import React from 'react';
import Link from 'next/link';
import styles from '@/styles/site/hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Connectez les meilleurs freelances avec les meilleures missions</h1>
        <p>
          Trouvez des missions passionnantes ou des talents exceptionnels pour votre projet.
          Notre plateforme utilise une intelligence artificielle avancée pour des matchs parfaits.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/register" className={styles.primaryButton}>
            Commencer maintenant
          </Link>
          <Link href="/about" className={styles.secondaryButton}>
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
