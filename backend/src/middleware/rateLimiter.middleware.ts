import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

declare module 'express' {
  interface Request {
    rateLimit?: {
      resetTime: number;
    };
  }
}

// Limiteur pour la route de connexion
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives maximum
  message: {
    error: 'Too many login attempts. Please try again after 15 minutes.'
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many login attempts. Please try again after 15 minutes.',
      remainingTime: Math.ceil(req.rateLimit?.resetTime ? (req.rateLimit.resetTime - Date.now()) / 1000 : 0)
    });
  }
});

// Limiteur pour la route d'inscription
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3, // 3 tentatives maximum
  message: {
    error: 'Too many registration attempts. Please try again after 1 hour.'
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many registration attempts. Please try again after 1 hour.',
      remainingTime: Math.ceil(req.rateLimit?.resetTime ? (req.rateLimit.resetTime - Date.now()) / 1000 : 0)
    });
  }
}); 