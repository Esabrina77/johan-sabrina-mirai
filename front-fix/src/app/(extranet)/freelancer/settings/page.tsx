'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Settings {
  emailNotifications: {
    newMissions: boolean;
    applicationUpdates: boolean;
    messages: boolean;
    payments: boolean;
  };
  privacy: {
    showProfile: boolean;
    showAvailability: boolean;
  };
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailableDate?: string;
  };
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: {
      newMissions: true,
      applicationUpdates: true,
      messages: true,
      payments: true
    },
    privacy: {
      showProfile: true,
      showAvailability: true
    },
    availability: {
      status: 'available'
    }
  });

  const handleNotificationChange = (key: keyof Settings['emailNotifications']) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key: keyof Settings['privacy']) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handleAvailabilityChange = (status: Settings['availability']['status']) => {
    setSettings(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        status
      }
    }));
  };

  return (
    <div>
      <h1>Paramètres</h1>

      <section>
        <h2>Notifications par email</h2>
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications.newMissions}
              onChange={() => handleNotificationChange('newMissions')}
            />
            Nouvelles missions disponibles
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications.applicationUpdates}
              onChange={() => handleNotificationChange('applicationUpdates')}
            />
            Mises à jour des candidatures
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications.messages}
              onChange={() => handleNotificationChange('messages')}
            />
            Nouveaux messages
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications.payments}
              onChange={() => handleNotificationChange('payments')}
            />
            Notifications de paiement
          </label>
        </div>
      </section>

      <section>
        <h2>Confidentialité</h2>
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.privacy.showProfile}
              onChange={() => handlePrivacyChange('showProfile')}
            />
            Rendre mon profil visible aux entreprises
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.privacy.showAvailability}
              onChange={() => handlePrivacyChange('showAvailability')}
            />
            Afficher ma disponibilité
          </label>
        </div>
      </section>

      <section>
        <h2>Disponibilité</h2>
        <div>
          <select
            value={settings.availability.status}
            onChange={(e) => handleAvailabilityChange(e.target.value as Settings['availability']['status'])}
          >
            <option value="available">Disponible</option>
            <option value="busy">Occupé</option>
            <option value="unavailable">Indisponible</option>
          </select>

          {settings.availability.status === 'unavailable' && (
            <div>
              <label>
                Prochaine date de disponibilité
                <input
                  type="date"
                  value={settings.availability.nextAvailableDate}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      nextAvailableDate: e.target.value
                    }
                  }))}
                />
              </label>
            </div>
          )}
        </div>
      </section>

      <button
        onClick={() => {
          // TODO: Sauvegarder les paramètres via l'API
          console.log('Paramètres à sauvegarder:', settings);
        }}
      >
        Enregistrer les modifications
      </button>
    </div>
  );
} 