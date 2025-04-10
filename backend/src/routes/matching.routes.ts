import { Router, RequestHandler } from 'express';
import * as matchingController from '../controllers/matching.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { isCompany, isFreelancer } from '../middleware/role.middleware';

const router = Router();

// Routes pour les freelancers
router.get('/suggestions', authenticateToken, isFreelancer, matchingController.getMissionSuggestions as unknown as RequestHandler);
router.get('/score/:missionId', authenticateToken, isFreelancer, matchingController.getMatchingScore as unknown as RequestHandler);

// Routes pour les entreprises
router.get('/freelancers/:missionId', authenticateToken, isCompany, matchingController.getFreelancerSuggestions as unknown as RequestHandler);

export default router; 