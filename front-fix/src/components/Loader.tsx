import styles from '@/styles/extranet/loader.module.css';

interface LoaderProps {
  fullscreen?: boolean;
}

export default function Loader({ fullscreen = false }: LoaderProps) {
  if (fullscreen) {
    return (
      <div className={styles.loaderContainer} style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  );
} 