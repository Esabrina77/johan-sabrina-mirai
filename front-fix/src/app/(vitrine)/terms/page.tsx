import React from 'react';
import '../legal.css';

export default function TermsPage() {
  return (
    <section className="legal-futuristic">
      <h1 className="futuristic-title">Conditions d&apos;utilisation</h1>
      <p className="futuristic-subtitle">Les règles d&apos;utilisation de la plateforme MIRAI.</p>
      <div className="legal-content">
        <h2>Acceptation</h2>
        <p>En utilisant MIRAI, vous acceptez nos conditions générales et vous engagez à respecter la législation en vigueur.</p>
        <h2>Comptes utilisateurs</h2>
        <p>Vous êtes responsable de la confidentialité de vos identifiants et de l&apos;utilisation de votre compte.</p>
        <h2>Propriété intellectuelle</h2>
        <p>Tous les contenus de la plateforme sont protégés. Toute reproduction est interdite sans autorisation.</p>
      </div>
    </section>
  );
} 