import React from 'react';
import './blog.css';

const posts = [
  {
    title: 'L’IA au service du recrutement freelance',
    excerpt: 'Découvrez comment l’intelligence artificielle révolutionne la mise en relation entre freelances et entreprises.',
    date: '2024-06-01',
  },
  {
    title: 'Tendances tech 2024',
    excerpt: 'Les compétences les plus recherchées cette année et comment les acquérir.',
    date: '2024-05-15',
  },
  {
    title: 'Réussir sa mission en remote',
    excerpt: 'Nos conseils pour collaborer efficacement à distance et livrer des projets de qualité.',
    date: '2024-04-28',
  },
];

export default function BlogPage() {
  return (
    <section className="blog-futuristic">
      <h1 className="futuristic-title">Le Blog MIRAI</h1>
      <p className="futuristic-subtitle">Actus, conseils et innovations pour freelances et entreprises.</p>
      <div className="blog-list">
        {posts.map((post, idx) => (
          <div className="blog-card" key={idx}>
            <div className="blog-date">{post.date}</div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <button className="blog-btn">Lire l’article</button>
          </div>
        ))}
      </div>
    </section>
  );
} 