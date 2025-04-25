import styles from '@/styles/components/modal.module.css';
import Cookies from 'js-cookie';

interface SessionExpiredModalProps {
  isOpen: boolean;
}

export default function SessionExpiredModal({ isOpen }: SessionExpiredModalProps) {
  if (!isOpen) return null;

  const handleLogin = () => {
    // Nettoyer les cookies
    Cookies.remove('token');
    Cookies.remove('user');
    
    // Forcer la redirection vers login
    window.location.replace('/login');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Session expirée</h2>
        <p>Votre session a expiré. Veuillez vous reconnecter pour continuer.</p>
        <button 
          onClick={handleLogin} 
          className={styles.button}
          style={{
            backgroundColor: '#0066cc',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '200px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          Se reconnecter
        </button>
      </div>
    </div>
  );
} 