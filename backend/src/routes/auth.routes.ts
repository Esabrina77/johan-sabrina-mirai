import { RequestHandler, Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

// Route d'inscription avec rate limiting
router.post('/register', registerLimiter, authController.register as unknown as RequestHandler);

// Route de connexion avec rate limiting
router.post('/login', loginLimiter, authController.login as unknown as RequestHandler);

export default router;
