import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

// Middleware pour vérifier si l'utilisateur a le rôle d'entreprise
export const isCompany = (req: Request, res: Response, next: NextFunction): void => {
  // Le rôle est stocké dans req.user.role
  const userRole = req.user?.role;

  if (userRole !== Role.company) {
    res.status(403).json({ error: 'Accès refusé. Seules les entreprises peuvent effectuer cette action.' });
    return;
  }

  next();
};

// Middleware pour vérifier si l'utilisateur a le rôle de freelance
export const isFreelancer = (req: Request, res: Response, next: NextFunction): void => {
  // Le rôle est stocké dans req.user.role
  const userRole = req.user?.role;

  if (userRole !== Role.freelancer) {
    res.status(403).json({ error: 'Accès refusé. Seuls les freelances peuvent effectuer cette action.' });
    return;
  }

  next();
}; 