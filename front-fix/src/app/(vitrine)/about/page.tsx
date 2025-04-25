import React from 'react';
import styles from '@/styles/site/about.module.css';

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>À propos de MIRAI</h1>
          <p>
            Notre mission est de révolutionner la façon dont les freelances
            et les entreprises se connectent.
          </p>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Notre histoire</h2>
          <p>
            Fondée en 2024, MIRAI est née d&apos;une simple observation :
            le processus de recrutement de freelances est souvent long, coûteux
            et inefficace. Nous avons décidé de changer cela en utilisant
            l&apos;intelligence artificielle pour créer des matchs parfaits
            entre talents et opportunités.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <h2>Nos valeurs</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3>Innovation</h3>
            <p>
              Nous repoussons constamment les limites de la technologie
              pour améliorer l&apos;expérience de nos utilisateurs.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h3>Transparence</h3>
            <p>
              Nous croyons en la transparence totale dans les relations
              entre freelances et entreprises.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h3>Qualité</h3>
            <p>
              Nous nous engageons à maintenir les plus hauts standards
              de qualité dans tous nos services.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <h2>Notre équipe</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>
              <img src="/images/team/ceo.jpg" alt="CEO" />
            </div>
            <h3>Jean Dupont</h3>
            <p>CEO & Co-fondateur</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>
              <img src="/images/team/cto.jpg" alt="CTO" />
            </div>
            <h3>Marie Martin</h3>
            <p>CTO & Co-fondatrice</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberImage}>
              <img src="/images/team/lead-dev.jpg" alt="Lead Developer" />
            </div>
            <h3>Thomas Bernard</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Rejoignez-nous</h2>
        <p>
          Que vous soyez freelance ou entreprise, découvrez comment MIRAI
          peut transformer votre façon de travailler.
        </p>
        <div className={styles.ctaButtons}>
          <a href="/freelancer" className={styles.primaryButton}>
            Devenir freelance
          </a>
          <a href="/company" className={styles.secondaryButton}>
            Recruter des freelances
          </a>
        </div>
      </section>
    </main>
  );
} 