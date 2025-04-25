'use client';

import { useState } from 'react';
import { supportService, type SupportTicket } from '@/services/support.service';
import styles from '@/styles/extranet/support.module.css';

type FAQCategory = 'general' | 'account' | 'missions' | 'payments';

interface FAQ {
  [key: string]: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const faq: FAQ = {
  general: {
    title: "Questions générales",
    questions: [
      {
        question: "Comment fonctionne la plateforme ?",
        answer: "Notre plateforme met en relation les freelances avec des entreprises pour des missions. Les entreprises publient leurs besoins et les freelances peuvent postuler aux missions qui correspondent à leurs compétences."
      },
      {
        question: "Quels types de missions peut-on trouver ?",
        answer: "Nous proposons des missions dans divers domaines : développement web, design, marketing digital, gestion de projet, etc. Les missions peuvent être à distance ou en présentiel, courtes ou longues durées."
      }
    ]
  },
  account: {
    title: "Compte et profil",
    questions: [
      {
        question: "Comment modifier mon profil ?",
        answer: "Vous pouvez modifier votre profil en allant dans les paramètres de votre compte. Vous pourrez y mettre à jour vos informations personnelles, compétences, et tarifs."
      },
      {
        question: "Comment supprimer mon compte ?",
        answer: "Pour supprimer votre compte, contactez notre support via le formulaire ci-dessous. Nous traiterons votre demande dans les plus brefs délais."
      }
    ]
  },
  missions: {
    title: "Missions",
    questions: [
      {
        question: "Comment postuler à une mission ?",
        answer: "Pour postuler, consultez les missions disponibles et cliquez sur 'Postuler' sur celles qui vous intéressent. Vous pourrez alors envoyer votre proposition détaillée à l'entreprise."
      },
      {
        question: "Comment sont gérés les paiements ?",
        answer: "Les paiements sont sécurisés et gérés via notre plateforme. Une fois la mission terminée et validée, le paiement est automatiquement débloqué selon les conditions définies."
      }
    ]
  },
  payments: {
    title: "Paiements",
    questions: [
      {
        question: "Quels sont les délais de paiement ?",
        answer: "Les paiements sont généralement traités sous 7 jours ouvrés après la validation de la mission. Les délais peuvent varier selon les conditions spécifiques de la mission."
      },
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les virements bancaires et les paiements par carte bancaire. Tous les paiements sont sécurisés et conformes aux normes en vigueur."
      }
    ]
  }
};

const resources = [
  {
    title: "Guide du freelance",
    description: "Un guide complet pour bien démarrer sur la plateforme",
    link: "/docs/freelance-guide.pdf"
  },
  {
    title: "Documentation API",
    description: "Documentation technique pour l'intégration",
    link: "/docs/api"
  },
  {
    title: "Tutoriels vidéo",
    description: "Série de tutoriels pour maîtriser la plateforme",
    link: "/tutorials"
  }
];

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('general');
  const [formData, setFormData] = useState<SupportTicket>({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await supportService.createTicket(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting support ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.supportContainer}>
      <h1>Support</h1>
      
      <section className={styles.faqSection}>
        <h2>Questions fréquentes</h2>
        <div className={styles.faqCategories}>
          {Object.keys(faq).map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category as FAQCategory)}
            >
              {faq[category].title}
            </button>
          ))}
        </div>
        <div className={styles.faqContent}>
          {faq[activeCategory].questions.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contactSection}>
        <h2>Nous contacter</h2>
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Sujet</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="general">Question générale</option>
              <option value="technical">Problème technique</option>
              <option value="billing">Facturation</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>
          {submitSuccess && (
            <p className={styles.successMessage}>
              Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
            </p>
          )}
        </form>
      </section>

      <section className={styles.resourcesSection}>
        <h2>Ressources utiles</h2>
        <div className={styles.resourcesGrid}>
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className={styles.resourceCard}
            >
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
} 