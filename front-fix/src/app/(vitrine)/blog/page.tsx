import Link from 'next/link';
import styles from '@/styles/site/blog.module.css';

export default function BlogPage() {
  return (
    <div className={styles.blogPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Blog MIRAI</h1>
          <p>Découvrez nos articles sur le freelancing, l&apos;intelligence artificielle et les conseils pour réussir dans le monde du travail indépendant.</p>
        </div>
      </section>

      <div className={styles.blogContent}>
        <aside className={styles.categories}>
          <h2>Catégories</h2>
          <ul>
            <li><Link href="/blog/category/freelancing">Freelancing</Link></li>
            <li><Link href="/blog/category/intelligence-artificielle">Intelligence Artificielle</Link></li>
            <li><Link href="/blog/category/conseils">Conseils</Link></li>
            <li><Link href="/blog/category/actualites">Actualités</Link></li>
          </ul>
        </aside>

        <div className={styles.articles}>
          <article className={styles.articleCard}>
            <div className={styles.articleImage}>
              <img src="/images/blog/freelance-success.jpg" alt="Succès en freelance" />
            </div>
            <div className={styles.articleContent}>
              <span className={styles.category}>Freelancing</span>
              <h3>10 conseils pour réussir en tant que freelance</h3>
              <p>Découvrez les stratégies essentielles pour bâtir une carrière freelance prospère et durable.</p>
              <Link href="/blog/10-conseils-freelance" className={styles.readMore}>Lire la suite</Link>
            </div>
          </article>

          <article className={styles.articleCard}>
            <div className={styles.articleImage}>
              <img src="/images/blog/ai-future.jpg" alt="L&apos;avenir de l&apos;IA" />
            </div>
            <div className={styles.articleContent}>
              <span className={styles.category}>Intelligence Artificielle</span>
              <h3>L&apos;IA et le futur du travail indépendant</h3>
              <p>Comment l&apos;intelligence artificielle transforme le paysage du freelancing et les opportunités qu&apos;elle crée.</p>
              <Link href="/blog/ia-futur-travail" className={styles.readMore}>Lire la suite</Link>
            </div>
          </article>

          <article className={styles.articleCard}>
            <div className={styles.articleImage}>
              <img src="/images/blog/remote-work.jpg" alt="Travail à distance" />
            </div>
            <div className={styles.articleContent}>
              <span className={styles.category}>Conseils</span>
              <h3>Optimiser sa productivité en télétravail</h3>
              <p>Les meilleures pratiques pour maintenir une productivité élevée lorsque l&apos;on travaille à distance.</p>
              <Link href="/blog/productivite-teletravail" className={styles.readMore}>Lire la suite</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 