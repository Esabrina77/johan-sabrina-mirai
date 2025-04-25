import React from 'react';
import styles from '@/styles/site/freelancer.module.css';

export default function FreelancerPage() {
  return (
    <main className={styles.freelancerPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Devenez Freelance sur MIRAI</h1>
          <p>
            Trouvez des missions passionnantes qui correspondent à vos compétences.
            Notre IA vous aide à trouver les meilleures opportunités.
          </p>
        </div>
      </section>

      <section className={styles.benefits}>
        <h2>Pourquoi choisir MIRAI ?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <h3>Matching intelligent</h3>
            <p>
              Notre IA analyse vos compétences et vos préférences pour vous proposer
              les missions les plus pertinentes.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <h3>Tarifs compétitifs</h3>
            <p>
              Fixez vos tarifs et négociez directement avec les entreprises.
              Pas de commission excessive.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <h3>Projets de qualité</h3>
            <p>
              Accédez à des missions intéressantes proposées par des entreprises
              sérieuses et innovantes.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <h2>Comment ça marche ?</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <h3>Créez votre profil</h3>
            <p>Décrivez vos compétences, votre expérience et vos attentes.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <h3>Recevez des propositions</h3>
            <p>Notre IA vous propose des missions qui correspondent à votre profil.</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <h3>Postulez et collaborez</h3>
            <p>Choisissez les missions qui vous intéressent et commencez à travailler.</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Prêt à commencer ?</h2>
        <p>
          Rejoignez notre communauté de freelances talentueux et trouvez
          des missions qui vous correspondent.
        </p>
        <a href="/register" className={styles.ctaButton}>
          Créer mon compte freelance
        </a>
      </section>
    </main>
  );
} 