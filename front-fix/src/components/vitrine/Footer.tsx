import React from 'react';
import Link from 'next/link';
import styles from '@/styles/site/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>MIRAI</h3>
          <p>
            La plateforme qui connecte les meilleurs freelances avec les meilleures missions
            grâce à l&apos;intelligence artificielle.
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Liens rapides</h4>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/about">À propos</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Légal</h4>
          <ul>
            <li><Link href="/privacy">Politique de confidentialité</Link></li>
            <li><Link href="/terms">Conditions d&apos;utilisation</Link></li>
            <li><Link href="/cookies">Politique des cookies</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Contact</h4>
          <ul>
            <li>Email: contact@mirai.com</li>
            <li>Tél: +33 1 23 45 67 89</li>
            <li>Paris, France</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} MIRAI. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
