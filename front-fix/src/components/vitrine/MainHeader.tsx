import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/components/MainHeader.css';

const MainHeader: React.FC = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link href="/" className="logo-link">
          <Image 
            src="/images/logo.png" 
            alt="MIRAI Logo" 
            width={100} 
            height={30}
            priority
          />
        </Link>
        
        <nav className="main-nav">
          <ul>
            <li><Link href="/about">À propos</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/freelancer">Freelances</Link></li>
            <li><Link href="/company">Entreprises</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <Link href="/login" className="btn btn-secondary">Connexion</Link>
          <Link href="/register" className="btn btn-primary">Inscription</Link>
        </div>
      </div>
    </header>
  );
};

export default MainHeader; 