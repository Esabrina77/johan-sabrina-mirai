'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/extranet/sidebar.module.css';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const freelancerLinks = [
    { href: '/freelancer/dashboard', label: 'Tableau de bord', },
    { href: '/freelancer/missions', label: 'Missions', },
    { href: '/freelancer/applications', label: 'Candidatures', },
    { href: '/freelancer/messages', label: 'Messages', },
    { href: '/freelancer/profile', label: 'Profil', },
  ];

  const companyLinks = [
    { href: '/company/dashboard', label: 'Tableau de bord', },
    { href: '/company/missions', label: 'Mes missions', },
    { href: '/company/create-mission', label: 'Créer une mission', },
    { href: '/company/applications', label: 'Candidatures reçues', },
    { href: '/company/messages', label: 'Messages', },
    { href: '/company/profile', label: 'Profil', },
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
          <span className={styles.icon}></span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
