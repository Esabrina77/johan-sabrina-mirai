import React from 'react';
import './freelancer.css';

export default function FreelancerPage() {
  return (
    <section className="freelancer-futuristic">
      <h1 className="futuristic-title">Espace Freelance</h1>
      <p className="futuristic-subtitle">Boostez votre carrière avec MIRAI et trouvez des missions sur-mesure grâce à l'IA.</p>
      <div className="freelancer-benefits">
        <div className="benefit-card">
          <h2>Matching intelligent</h2>
          <p>Recevez des missions parfaitement adaptées à vos compétences et à vos envies.</p>
        </div>
        <div className="benefit-card">
          <h2>Visibilité accrue</h2>
          <p>Votre profil est mis en avant auprès des entreprises innovantes.</p>
        </div>
        <div className="benefit-card">
          <h2>Gestion simplifiée</h2>
          <p>Facturation, paiements et communication centralisés sur une seule plateforme.</p>
        </div>
      </div>
    </section>
  );
} 