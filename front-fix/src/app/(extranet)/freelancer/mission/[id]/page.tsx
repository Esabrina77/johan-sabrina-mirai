'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import missionService, { type Mission } from '@/services/mission.service';
import applicationService from '@/services/application.service';
import { matchingService } from '@/services/matching.service';
import styles from '@/styles/extranet/freelancer/mission-details.module.css';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';

interface MissionWithScore extends Mission {
  matchingScore?: number;
}

export default function MissionDetail() {
  const params = useParams();
  const router = useRouter();
  const [mission, setMission] = useState<MissionWithScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const missionData = await missionService.getMissionById(Number(params.id));
        if (!missionData) {
          setError('Mission non trouvée');
          return;
        }

        // Vérifier si l'utilisateur a déjà postulé à cette mission
        const applications = await applicationService.getApplications();
        const hasApplied = applications.some(app => app.missionId === missionData.id);
        setAlreadyApplied(hasApplied);

        // Récupérer le vrai score de matching
        const { score } = await matchingService.getMissionScore(missionData.id);
        
        setMission({
          ...missionData,
          matchingScore: score
        });
      } catch (err) {
        setError('Erreur lors du chargement de la mission');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission || !user) return;

    if (!mission.company) {
      setError("Impossible de trouver l'entreprise associée à la mission.");
      setApplying(false);
      return;
    }

    setApplying(true);
    try {
      // 1. Créer la candidature
      await applicationService.apply({
        missionId: mission.id,
        message
      });

      // 2. Créer la conversation entre le freelancer et la company
      const participantIds = [user.id, mission.company.id];
      const conversationRes = await api.post('/api/messages/conversations', { participantIds });
      const conversationId = (conversationRes.data as any).id;

      // 3. Envoyer le message de candidature dans la conversation
      await api.post('/api/messages', {
        conversationId,
        content: message
      });

      setSuccess(true);
      setMessage('');
    } catch (err) {
      setError('Erreur lors de l\'envoi de la candidature');
      console.error(err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!mission) return <div className={styles.error}>Mission non trouvée</div>;

  if (alreadyApplied) {
    return (
      <div className={styles.info}>
        <h2>Vous avez déjà postulé à cette mission.</h2>
        <p>Vous ne pouvez pas soumettre une nouvelle candidature.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.success}>
        <h2>Candidature envoyée !</h2>
        <p>Votre candidature a bien été envoyée et une conversation a été créée avec l'entreprise.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{mission.title}</h1>
      
      <div className={styles.section}>
        <h2>Détails de la mission</h2>
        <p className={styles.description}>{mission.description}</p>
        <div className={styles.details}>
          <p>Budget: {mission.budget}€</p>
          <p>Catégorie: {mission.category}</p>
          {mission.requiredSkills && mission.requiredSkills.length > 0 && (
            <div className={styles.skills}>
              <h3>Compétences requises:</h3>
              <ul>
                {mission.requiredSkills.map((skill, index) => (
                  <li key={index} className={styles.skill}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.matchingScore}>
        <h2>Score de matching</h2>
        <p>{mission.matchingScore || 'N/A'}%</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.applicationForm}>
        <h2>Postuler à cette mission</h2>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message de candidature</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            placeholder="Présentez votre motivation et votre expérience pertinente pour cette mission..."
            className={styles.textarea}
          />
        </div>
        <button 
          type="submit" 
          disabled={applying}
          className={styles.submitButton}
        >
          {applying ? 'Envoi en cours...' : 'Envoyer ma candidature'}
        </button>
      </form>
    </div>
  );
} 