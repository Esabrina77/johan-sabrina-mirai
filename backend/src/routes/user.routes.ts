import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Route protégée pour obtenir le profil
router.get('/profile', authenticateToken, userController.getProfile);

// Route protégée pour mettre à jour le profil
router.put('/profile', authenticateToken, userController.updateProfile);

// Route protégée pour changer le mot de passe
router.put('/profile/password', authenticateToken, userController.changePassword);

// Route protégée pour supprimer le compte
router.delete('/profile', authenticateToken, userController.deleteAccount);

export default router;