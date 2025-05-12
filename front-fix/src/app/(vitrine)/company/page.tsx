import React from 'react';
import './company.css';

export default function CompanyPage() {
  return (
    <section className="company-futuristic">
      <h1 className="futuristic-title">Espace Entreprise</h1>
      <p className="futuristic-subtitle">Trouvez les meilleurs freelances pour vos projets grâce à la technologie MIRAI.</p>
      <div className="company-benefits">
        <div className="benefit-card">
          <h2>Recrutement éclair</h2>
          <p>Accédez rapidement à des profils qualifiés et disponibles.</p>
        </div>
        <div className="benefit-card">
          <h2>Matching sur-mesure</h2>
          <p>L'IA sélectionne pour vous les freelances les plus adaptés à vos besoins.</p>
        </div>
        <div className="benefit-card">
          <h2>Sécurité & simplicité</h2>
          <p>Paiement sécurisé, gestion des contrats et suivi centralisé.</p>
        </div>
      </div>
    </section>
  );
} 