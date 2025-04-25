import React from 'react';
import Link from 'next/link';
import styles from '@/styles/site/cta.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2>Prêt à commencer ?</h2>
        <p>
          Rejoignez notre communauté de freelances et d&apos;entreprises innovantes.
          Créez votre compte gratuitement et découvrez les opportunités qui vous attendent.
        </p>
        <Link href="/register" className={styles.ctaButton}>
          S&apos;inscrire gratuitement
        </Link>
      </div>
    </section>
  );
};

export default CTA;
