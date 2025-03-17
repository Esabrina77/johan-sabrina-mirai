import { RequestHandler, Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Route d'inscription
router.post('/register', authController.register as unknown as RequestHandler);

// Route de connexion
router.post('/login', authController.login as unknown as RequestHandler);

export default router;
