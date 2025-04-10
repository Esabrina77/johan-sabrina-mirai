import { Router, RequestHandler } from 'express';
import * as reviewController from '../controllers/review.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Routes protégées nécessitant une authentification
router.post('/', authenticateToken, reviewController.createReview as RequestHandler);
router.get('/user/:userId', authenticateToken, reviewController.getUserReviews as RequestHandler);
router.get('/mission/:missionId', authenticateToken, reviewController.getMissionReviews as RequestHandler);

export default router; 