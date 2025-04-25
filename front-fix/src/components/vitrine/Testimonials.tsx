import React from 'react';
import styles from '@/styles/site/testimonials.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'Freelance Développeuse',
    content: 'Grâce à MIRAI, j&apos;ai trouvé des missions passionnantes qui correspondent parfaitement à mes compétences. Le système de matching est vraiment efficace !',
    image: '/images/testimonials/marie.jpg'
  },
  {
    id: 2,
    name: 'Thomas Martin',
    role: 'CEO, TechStart',
    content: 'La qualité des freelances sur MIRAI est exceptionnelle. L&apos;IA nous aide à trouver les meilleurs talents pour nos projets.',
    image: '/images/testimonials/thomas.jpg'
  },
  {
    id: 3,
    name: 'Sophie Lambert',
    role: 'Freelance Designer',
    content: 'Je recommande MIRAI à tous les freelances qui cherchent des missions de qualité. La plateforme est intuitive et les opportunités sont nombreuses.',
    image: '/images/testimonials/sophie.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <h2>Ce qu&apos;en pensent nos utilisateurs</h2>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={styles.testimonialCard}>
            <div className={styles.testimonialImage}>
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>{testimonial.content}</p>
              <div className={styles.testimonialAuthor}>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
