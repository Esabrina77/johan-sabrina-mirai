import React from 'react';
import Link from 'next/link';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-futuristic">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MIRAI</h3>
          <p>
            La plateforme qui connecte les meilleurs freelances avec les meilleures missions
            grâce à l&apos;intelligence artificielle.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/about">À propos</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Légal</h4>
          <ul>
            <li><Link href="/privacy">Politique de confidentialité</Link></li>
            <li><Link href="/terms">Conditions d&apos;utilisation</Link></li>
            <li><Link href="/cookies">Politique des cookies</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: contact@mirai.com</li>
            <li>Tél: +33 1 23 45 67 89</li>
            <li>Paris, France</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MIRAI. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
