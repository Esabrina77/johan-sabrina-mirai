import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Route protégée pour obtenir le profil
router.get('/profile', authenticateToken, userController.getProfile);

export default router; 