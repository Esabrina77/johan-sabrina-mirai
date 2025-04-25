import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/site/blog.module.css';

export default function ArticlePage() {
  return (
    <div className={styles.articlePage}>
      <article className={styles.articleContent}>
        <div className={styles.articleHeader}>
          <span className={styles.category}>Conseils</span>
          <h1>Optimiser sa productivité en télétravail</h1>
          <div className={styles.meta}>
            <span>Publié le 11 avril 2025</span>
            <span>•</span>
            <span>8 min de lecture</span>
          </div>
        </div>

        <div className={styles.articleImage}>
          <Image
            src="/images/blog/remote-work.jpg"
            alt="Travail à distance"
            width={1200}
            height={600}
            priority
          />
        </div>

        <div className={styles.articleBody}>
          <p className={styles.intro}>
            Le télétravail offre une flexibilité sans précédent, mais maintenir une productivité élevée à distance nécessite une approche structurée. Découvrez les meilleures pratiques pour optimiser votre efficacité lorsque vous travaillez depuis chez vous.
          </p>

          <h2>1. Aménagez votre espace de travail</h2>
          <p>
            Créez un environnement dédié au travail, même dans un petit espace. Investissez dans un bureau confortable, une chaise ergonomique et un éclairage approprié. Un espace bien organisé favorise la concentration et la productivité.
          </p>

          <h2>2. Établissez une routine</h2>
          <p>
            Définissez des horaires de travail fixes et respectez-les. Commencez et terminez votre journée à des heures régulières. Une routine stable aide à maintenir un équilibre entre vie professionnelle et personnelle.
          </p>

          <h2>3. Utilisez les bons outils</h2>
          <p>
            Équipez-vous d&apos;outils de collaboration efficaces : visioconférence, gestion de projet, communication instantanée. Automatisez les tâches répétitives avec des outils appropriés pour gagner du temps.
          </p>

          <h2>4. Gérez les distractions</h2>
          <p>
            Identifiez vos sources de distraction et mettez en place des stratégies pour les minimiser. Utilisez des applications de blocage de sites, définissez des plages horaires sans interruption et communiquez vos disponibilités à votre entourage.
          </p>

          <h2>5. Prenez des pauses régulières</h2>
          <p>
            Respectez la méthode Pomodoro ou des techniques similaires. Des pauses courtes et régulières améliorent la concentration et préviennent l&apos;épuisement. Profitez-en pour vous étirer ou faire une courte promenade.
          </p>

          <h2>6. Maintenez une communication efficace</h2>
          <p>
            Développez des habitudes de communication claires avec votre équipe. Utilisez les bons canaux pour le bon type de message et établissez des attentes claires concernant les temps de réponse.
          </p>

          <div className={styles.conclusion}>
            <p>
              Le télétravail réussi repose sur une combinaison de discipline personnelle, d&apos;outils appropriés et de bonnes pratiques de communication. En appliquant ces conseils, vous pourrez maintenir une productivité élevée tout en profitant des avantages du travail à distance.
            </p>
          </div>
        </div>

        <div className={styles.articleFooter}>
          <Link href="/blog" className={styles.backToBlog}>
            ← Retour au blog
          </Link>
        </div>
      </article>
    </div>
  );
} 