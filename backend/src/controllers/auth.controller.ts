import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

//register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    if (!['freelancer', 'company'].includes(role)) {
      return res.status(400).json({ error: 'Rôle invalide' });
    }

    const result = await authService.register(email, password, name, role as 'freelancer' | 'company');
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Un utilisateur avec cet email existe déjà') {
        return res.status(400).json({ error: error.message });
      }
    }
    console.error('Erreur lors de l\'inscription:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

//login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Email ou mot de passe incorrect') {
        return res.status(401).json({ error: error.message });
      }
    }
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};