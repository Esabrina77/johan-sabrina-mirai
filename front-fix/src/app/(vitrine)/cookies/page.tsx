import React from 'react';
import '../legal.css';

export default function CookiesPage() {
  return (
    <section className="legal-futuristic">
      <h1 className="futuristic-title">Politique des cookies</h1>
      <p className="futuristic-subtitle">Comment et pourquoi nous utilisons des cookies sur MIRAI.</p>
      <div className="legal-content">
        <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>Un cookie est un petit fichier texte stocké sur votre appareil pour améliorer votre expérience utilisateur.</p>
        <h2>Utilisation</h2>
        <p>Nous utilisons des cookies pour l&apos;authentification, l&apos;analyse de trafic et la personnalisation du contenu.</p>
        <h2>Gestion</h2>
        <p>Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur.</p>
      </div>
    </section>
  );
} 