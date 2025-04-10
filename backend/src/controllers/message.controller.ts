import { Request, Response } from 'express';
import * as messageService from '../services/message.service';

/**
 * Crée une nouvelle conversation entre deux utilisateurs
 * @route POST /api/messages/conversations
 * @access Private
 * @body { participantIds: number[] } - IDs des participants à la conversation
 */
export const createConversation = async (req: Request, res: Response) => {
  try {
    const { participantIds } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    // Vérifier que l'utilisateur est inclus dans les participants
    if (!participantIds.includes(userId)) {
      return res.status(400).json({ error: 'Vous devez être participant de la conversation' });
    }

    const conversation = await messageService.createConversation(participantIds);
    return res.status(201).json(conversation);
  } catch (error) {
    console.error('Erreur lors de la création de la conversation:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

/**
 * Envoie un message dans une conversation
 * @route POST /api/messages
 * @access Private
 * @body { conversationId: number, content: string } - ID de la conversation et contenu du message
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    if (!content || !conversationId) {
      return res.status(400).json({ error: 'Contenu et ID de conversation requis' });
    }

    const message = await messageService.sendMessage(userId, conversationId, content);
    return res.status(201).json(message);
  } catch (error) {
    if (error instanceof Error && error.message === 'Conversation not found or unauthorized') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Erreur lors de l\'envoi du message:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

/**
 * Récupère toutes les conversations d'un utilisateur
 * @route GET /api/messages/conversations
 * @access Private
 */
export const getUserConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    const conversations = await messageService.getUserConversations(userId);
    return res.status(200).json(conversations);
  } catch (error) {
    console.error('Erreur lors de la récupération des conversations:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

/**
 * Récupère tous les messages d'une conversation
 * @route GET /api/messages/conversations/:conversationId
 * @access Private
 */
export const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    const messages = await messageService.getConversationMessages(parseInt(conversationId), userId);
    return res.status(200).json(messages);
  } catch (error) {
    if (error instanceof Error && error.message === 'Conversation not found or unauthorized') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Erreur lors de la récupération des messages:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

/**
 * Marque tous les messages d'une conversation comme lus
 * @route PUT /api/messages/conversations/:conversationId/read
 * @access Private
 */
export const markMessagesAsRead = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    await messageService.markMessagesAsRead(parseInt(conversationId), userId);
    return res.status(200).json({ message: 'Messages marqués comme lus' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Conversation not found or unauthorized') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Erreur lors du marquage des messages comme lus:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}; 