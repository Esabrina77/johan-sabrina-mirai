import React from 'react';
import './contact.css';

export default function ContactPage() {
  return (
    <section className="contact-futuristic">
      <h1 className="futuristic-title">Contactez-nous</h1>
      <p className="futuristic-subtitle">Une question, une suggestion ? Notre équipe vous répond rapidement.</p>
      <div className="contact-content">
        <form className="contact-form">
          <input type="text" placeholder="Votre nom" required />
          <input type="email" placeholder="Votre email" required />
          <textarea placeholder="Votre message" rows={5} required />
          <button type="submit">Envoyer</button>
        </form>
        <div className="contact-info">
          <h2>Informations</h2>
          <p>Email : <a href="mailto:contact@mirai.com">contact@mirai.com</a></p>
          <p>Adresse : 42 Avenue du Futur, Paris</p>
        </div>
      </div>
    </section>
  );
} 