import { Request, Response } from 'express';
import * as applicationService from '../services/application.service';
import { ApplicationStatus } from '@prisma/client';

// Soumettre une candidature
export const apply = async (req: Request, res: Response) => {
  try {
    const { missionId, message } = req.body;
    const freelancerId = req.user?.userId;

    if (!freelancerId) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    if (!message) {
      return res.status(400).json({ error: 'Le message de candidature est requis' });
    }

    const application = await applicationService.applyToMission(freelancerId, missionId, message);
    res.status(201).json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir les candidatures reçues (pour les entreprises)
export const getReceivedApplications = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const companyId = req.user.userId;
    const applications = await applicationService.getReceivedApplications(companyId);

    return res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching received applications:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtenir les candidatures soumises (pour les freelancers)
export const getSentApplications = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const freelancerId = req.user.userId;
    const applications = await applicationService.getSentApplications(freelancerId);

    return res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching sent applications:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Mettre à jour le statut d'une candidature (pour les entreprises)
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const applicationId = parseInt(req.params.id);
    const { status } = req.body;
    const companyId = (req as any).user.userId;

    // Vérifier que le statut est valide
    const validStatuses = ['sent', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Statut invalide. Les statuts valides sont : sent, accepted, rejected' 
      });
    }

    const application = await applicationService.updateApplicationStatus(
      applicationId,
      status,
      companyId
    );

    res.json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}; 