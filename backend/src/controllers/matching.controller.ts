import { Request, Response } from 'express';
import * as matchingService from '../services/matching.service';
import { isCompany } from '../middleware/role.middleware';

// Obtenir les suggestions de missions pour un freelancer
export const getMissionSuggestions = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const suggestions = await matchingService.getMissionSuggestions(userId);
    return res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error getting mission suggestions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtenir les suggestions de freelancers pour une mission
export const getFreelancerSuggestions = async (req: Request, res: Response) => {
  try {
    const missionId = parseInt(req.params.missionId);
    if (isNaN(missionId)) {
      return res.status(400).json({ error: 'Invalid mission ID' });
    }

    const suggestions = await matchingService.getFreelancerSuggestions(missionId);
    return res.status(200).json(suggestions);
  } catch (error) {
    if (error instanceof Error && error.message === 'Mission not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Error getting freelancer suggestions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Obtenir le score de matching pour une mission spécifique
export const getMatchingScore = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const missionId = parseInt(req.params.missionId);
    if (isNaN(missionId)) {
      return res.status(400).json({ error: 'Invalid mission ID' });
    }

    const score = await matchingService.getMatchingScore(userId, missionId);
    return res.status(200).json({ score });
  } catch (error) {
    console.error('Error getting matching score:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 