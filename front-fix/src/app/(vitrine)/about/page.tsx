import React from 'react';
import './about.css';

export default function AboutPage() {
  return (
    <section className="about-futuristic">
      <h1 className="futuristic-title">À propos de MIRAI</h1>
      <p className="futuristic-subtitle">Notre mission : connecter les talents du futur avec les entreprises innovantes.</p>
      <div className="about-team-section">
        <h2 className="futuristic-section-title">Notre équipe</h2>
        <div className="team-cards">
          <div className="team-card">
            <div className="avatar-glow"></div>
            <h3>Johan</h3>
            <p>Co-fondateur & CTO</p>
          </div>
          <div className="team-card">
            <div className="avatar-glow"></div>
            <h3>Sabrina</h3>
            <p>Co-fondatrice & CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
} 