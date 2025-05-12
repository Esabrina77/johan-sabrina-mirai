import { Router, RequestHandler } from 'express';
import * as applicationController from '../controllers/application.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { isCompany } from '../middleware/role.middleware';

const router = Router();

// Route pour postuler à une mission
router.post('/', authenticateToken, applicationController.apply as unknown as RequestHandler);

// Routes pour obtenir les candidatures
router.get('/received', authenticateToken, isCompany, applicationController.getReceivedApplications as unknown as RequestHandler);
router.get('/sent', authenticateToken, applicationController.getSentApplications as unknown as RequestHandler);

// Route pour mettre à jour le statut d'une candidature
router.patch('/:id/status', authenticateToken, isCompany, applicationController.updateApplicationStatus as unknown as RequestHandler);

export default router; 