import React from 'react';
import './home.css';

export default function Home() {
  return (
    <section className="home-futuristic">
      <div className="hero-futuristic">
        <h1 className="futuristic-title">Connectez les meilleurs freelances<br />avec les meilleures missions</h1>
        <p className="futuristic-subtitle">La plateforme qui propulse vos projets et votre carrière grâce à l'intelligence artificielle.</p>
        <div className="hero-btns">
          <a href="/freelancer" className="btn-futuristic">Je suis freelance</a>
          <a href="/company" className="btn-futuristic btn-alt">Je suis une entreprise</a>
        </div>
      </div>
      <div className="home-benefits">
        <div className="benefit-card">
          <h2>Matching intelligent</h2>
          <p>Notre IA analyse vos besoins ou compétences pour des mises en relation parfaites.</p>
        </div>
        <div className="benefit-card">
          <h2>Paiement sécurisé</h2>
          <p>Transactions protégées et gestion simplifiée pour tous vos projets.</p>
        </div>
        <div className="benefit-card">
          <h2>Communauté d'excellence</h2>
          <p>Rejoignez un réseau de talents et d'entreprises innovantes.</p>
        </div>
      </div>
    </section>
  );
}
