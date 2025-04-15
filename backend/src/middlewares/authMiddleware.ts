import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { prisma } from '../lib/prisma';

// Étendre l'interface Request pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: string;
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Extraire le token
    const token = authHeader.split(' ')[1];
    
    // Vérifier et décoder le token
    const decoded = verifyToken(token);
    
    // Ajouter l'utilisateur à la requête
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware pour vérifier le rôle de l'utilisateur
export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Récupérer l'utilisateur depuis la base de données
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Vérifier si l'utilisateur a le rôle requis
      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};
