import React from 'react';
import '../legal.css';

export default function PrivacyPage() {
  return (
    <section className="legal-futuristic">
      <h1 className="futuristic-title">Politique de confidentialité</h1>
      <p className="futuristic-subtitle">Comment nous protégeons vos données et respectons votre vie privée.</p>
      <div className="legal-content">
        <h2>Collecte des données</h2>
        <p>Nous collectons uniquement les informations nécessaires à la fourniture de nos services (nom, email, etc.). Vos données ne sont jamais revendues à des tiers.</p>
        <h2>Utilisation</h2>
        <p>Les données servent à personnaliser votre expérience, sécuriser la plateforme et améliorer nos services.</p>
        <h2>Sécurité</h2>
        <p>Nous mettons en œuvre des mesures de sécurité avancées pour protéger vos informations.</p>
      </div>
    </section>
  );
} 