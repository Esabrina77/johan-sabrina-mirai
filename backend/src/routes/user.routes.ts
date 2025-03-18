import { Router, RequestHandler } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Route pour récupérer tous les utilisateurs (protégée par authentification)
router.get('/', authenticateToken, userController.getAllUsers as unknown as RequestHandler);

// Route protégée pour obtenir le profil
router.get('/profile', authenticateToken, userController.getProfile as unknown as RequestHandler);

// Route protégée pour mettre à jour le profil
router.put('/profile', authenticateToken, userController.updateProfile as unknown as RequestHandler);

// Route protégée pour changer le mot de passe
router.put('/profile/password', authenticateToken, userController.changePassword as unknown as RequestHandler);

// Route protégée pour supprimer le compte
router.delete('/profile', authenticateToken, userController.deleteAccount as unknown as RequestHandler);

export default router;