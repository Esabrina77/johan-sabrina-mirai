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
            <li><Link href="/missions">Missions</Link></li>
            <li><Link href="/freelancers">Freelancers</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <Link href="/login" className="btn btn-secondary">Login</Link>
          <Link href="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default MainHeader; 