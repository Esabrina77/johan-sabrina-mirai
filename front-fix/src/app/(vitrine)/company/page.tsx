import React from 'react';
import styles from '@/styles/site/company.module.css';

export default function CompanyPage() {
  return (
    <main className={styles.companyPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Trouvez les meilleurs freelances pour vos projets</h1>
          <p>
            Notre IA vous aide à identifier les talents qui correspondent
            parfaitement à vos besoins.
          </p>
        </div>
      </section>

      <section className={styles.benefits}>
        <h2>Pourquoi choisir MIRAI ?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <h3>Matching précis</h3>
            <p>
              Notre IA analyse vos besoins et trouve les freelances dont les
              compétences correspondent exactement à votre projet.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <h3>Gain de temps</h3>
            <p>
              Plus besoin de passer des heures à trier les CVs. Notre système
              vous propose directement les meilleurs candidats.
            </p>
          </div>
          <div className={styles.benefitCard}>
            <h3>Qualité garantie</h3>
            <p>
              Tous nos freelances sont vérifiés et évalués pour garantir
              la qualité de leur travail.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <h2>Comment ça marche ?</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <h3>Créez votre mission</h3>
            <p>
              Décrivez votre projet, vos besoins et vos attentes en termes
              de compétences.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <h3>Recevez des propositions</h3>
            <p>
              Notre IA vous propose les freelances les plus adaptés à votre projet.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <h3>Collaborez facilement</h3>
            <p>
              Gérez votre projet et communiquez avec votre freelance via notre
              plateforme.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Prêt à commencer ?</h2>
        <p>
          Rejoignez les entreprises qui font confiance à MIRAI pour trouver
          les meilleurs talents.
        </p>
        <a href="/register" className={styles.ctaButton}>
          Créer mon compte entreprise
        </a>
      </section>
    </main>
  );
} 