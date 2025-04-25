import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/components/ExtranetHeader.css';

interface User {
  name: string;
  role: 'freelancer' | 'company';
  avatar?: string;
}


interface ExtranetHeaderProps {
  user: User;
  onLogout: () => void;
}

export const ExtranetHeader: React.FC<ExtranetHeaderProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="extranet-header">
      <nav className="extranet-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo-container">
              <Link href="/extranet/dashboard">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
              </Link>
            </div>
            <div className="nav-links">
              <Link href="/extranet/dashboard" className="nav-link">
                Tableau de bord
              </Link>
              <Link href="/extranet/missions" className="nav-link">
                Missions
              </Link>
              <Link href="/extranet/applications" className="nav-link">
                Candidatures
              </Link>
              <Link href="/extranet/messages" className="nav-link">
                Messages
              </Link>
            </div>
          </div>
          <div className="user-menu">
            <div className="user-menu-container">
              <div>
                <button
                  onClick={toggleMenu}
                  className="user-button"
                  aria-label="Menu utilisateur"
                >
                  {user.avatar ? (
                    <Image
                      className="avatar"
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {getInitials(user.name)}
                    </div>
                  )}
                </button>
              </div>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link href="/extranet/profile" className="dropdown-item">
                    Mon profil
                  </Link>
                  <Link href="/extranet/settings" className="dropdown-item">
                    Paramètres
                  </Link>
                  <button
                    onClick={onLogout}
                    className="dropdown-button"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}; 