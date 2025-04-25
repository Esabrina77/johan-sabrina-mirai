'use client';

import { useState, useEffect } from 'react';
import { notificationService, type Notification } from '@/services/notification.service';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } catch (err) {
        setError('Erreur lors du chargement des notifications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: number) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prevNotifications =>
        prevNotifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error('Erreur lors du marquage de la notification comme lue:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prevNotifications =>
        prevNotifications.map(notif => ({ ...notif, read: true }))
      );
    } catch (err) {
      console.error('Erreur lors du marquage de toutes les notifications comme lues:', err);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'application':
        return '📝';
      case 'message':
        return '✉️';
      case 'payment':
        return '💰';
      case 'system':
        return '🔔';
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div>
        <h1>Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead}>
            Marquer tout comme lu ({unreadCount})
          </button>
        )}
      </div>

      <div>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => !notification.read && markAsRead(notification.id)}
              style={{ opacity: notification.read ? 0.7 : 1, cursor: notification.read ? 'default' : 'pointer' }}
            >
              <div>
                <span>{getNotificationIcon(notification.type)}</span>
                <h3>{notification.title}</h3>
                <p>{notification.content}</p>
                <small>
                  {new Date(notification.createdAt).toLocaleDateString()} - 
                  {notification.read ? ' Lu' : ' Non lu'}
                </small>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune notification</p>
        )}
      </div>
    </div>
  );
} 