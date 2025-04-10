import { Router, RequestHandler } from 'express';
import * as messageController from '../controllers/message.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticateToken);

// Routes pour les conversations
router.post('/conversations', messageController.createConversation as unknown as RequestHandler);
router.get('/conversations', messageController.getUserConversations as unknown as RequestHandler);
router.get('/conversations/:conversationId', messageController.getConversationMessages as unknown as RequestHandler);
router.put('/conversations/:conversationId/read', messageController.markMessagesAsRead as unknown as RequestHandler);

// Route pour envoyer un message
router.post('/', messageController.sendMessage as unknown as RequestHandler);

export default router; 