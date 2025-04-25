'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import messageService, { type Message, type Conversation } from '@/services/message.service';
import styles from '@/styles/extranet/messages.module.css';

// Icône de flèche d'envoi
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previousMessagesRef = useRef<Message[]>([]);

  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
      const interval = setInterval(() => loadMessages(selectedConversation.id), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    try {
      const data = await messageService.getConversations();
      setConversations(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des conversations:', error);
      setError('Impossible de charger les conversations');
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Vérifie s'il y a de nouveaux messages
    const hasNewMessages = messages.some(message => 
      !previousMessagesRef.current.find(prev => prev.id === message.id) &&
      message.senderId !== user?.id
    );

    if (hasNewMessages) {
      scrollToBottom();
    }

    previousMessagesRef.current = messages;
  }, [messages, user?.id]);

  const loadMessages = async (conversationId: number) => {
    try {
      const data = await messageService.getConversationMessages(conversationId);
      setMessages(data);
      // Marquer les messages comme lus
      await messageService.markAsRead(conversationId);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      setError('Impossible de charger les messages');
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await messageService.sendMessage({
        conversationId: selectedConversation.id,
        content: newMessage.trim()
      });
      setNewMessage('');
      // Recharger les messages pour obtenir le nouveau message
      await loadMessages(selectedConversation.id);
      scrollToBottom();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setError('Impossible d\'envoyer le message');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier";
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = formatMessageDate(message.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Conversations</h2>
        </div>
        <div className={styles.conversationList}>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`${styles.conversationItem} 
                ${selectedConversation?.id === conversation.id ? styles.active : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className={styles.conversationName}>
                {conversation.participants.find(p => p.id !== user?.id)?.name}
              </div>
              <div className={styles.lastMessage}>
                {conversation.lastMessage?.content}
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className={styles.noConversations}>
              Aucune conversation
            </div>
          )}
        </div>
      </div>

      <div className={styles.chatContainer}>
        {selectedConversation ? (
          <>
            <div className={styles.chatHeader}>
              <h2>{selectedConversation.participants.find(p => p.id !== user?.id)?.name}</h2>
            </div>
            <div className={styles.messageList}>
              {Object.entries(messageGroups).map(([date, groupMessages]) => (
                <div key={date}>
                  <div className={styles.dateHeader}>
                    <span>{date}</span>
                  </div>
                  {groupMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.message} ${
                        message.senderId === user?.id ? styles.sent : styles.received
                      }`}
                    >
                      <div className={styles.messageContent}>
                        {message.content}
                        <span className={styles.messageTime}>
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className={styles.messageForm}>
              <div className={styles.messageInputWrapper}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className={styles.messageInput}
                />
                <button type="submit" className={styles.sendButton} disabled={!newMessage.trim()}>
                  <SendIcon />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.noConversationSelected}>
            Sélectionnez une conversation pour commencer à discuter
          </div>
        )}
      </div>
    </div>
  );
} 