import { Router, RequestHandler } from 'express';
import * as applicationController from '../controllers/application.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { isCompany, isFreelancer } from '../middleware/role.middleware';

const router = Router();

// Route pour voir les candidatures reçues (entreprises)
router.get('/company/received', authenticateToken, isCompany, applicationController.getReceivedApplications as unknown as RequestHandler);

// Route pour voir ses candidatures soumises (freelancers)
router.get('/freelancer/sent', authenticateToken, isFreelancer, applicationController.getSentApplications as unknown as RequestHandler);

// Route pour accepter/rejeter une candidature (entreprises)
router.patch('/:id/status', authenticateToken, isCompany, applicationController.updateApplicationStatus as unknown as RequestHandler);

export default router; 