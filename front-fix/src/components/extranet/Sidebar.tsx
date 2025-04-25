'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/extranet/sidebar.module.css';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const freelancerLinks = [
    { href: '/freelancer/dashboard', label: 'Tableau de bord', icon: '📊' },
    { href: '/freelancer/missions', label: 'Missions', icon: '📋' },
    { href: '/freelancer/applications', label: 'Candidatures', icon: '📬' },
    { href: '/freelancer/messages', label: 'Messages', icon: '💬' },
    { href: '/freelancer/profile', label: 'Profil', icon: '👤' },
  ];

  const companyLinks = [
    { href: '/company/dashboard', label: 'Tableau de bord', icon: '📊' },
    { href: '/company/missions', label: 'Mes missions', icon: '📋' },
    { href: '/company/create-mission', label: 'Créer une mission', icon: '➕' },
    { href: '/company/applications', label: 'Candidatures reçues', icon: '📬' },
    { href: '/company/messages', label: 'Messages', icon: '💬' },
    { href: '/company/profile', label: 'Profil', icon: '👤' },
  ];

  const links = user?.role === 'freelancer' ? freelancerLinks : companyLinks;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/">MIRAI</Link>
      </div>

      <nav className={styles.nav}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.userInfo}>
        <div className={styles.userName}>{user?.name}</div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <span className={styles.icon}>🚪</span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
