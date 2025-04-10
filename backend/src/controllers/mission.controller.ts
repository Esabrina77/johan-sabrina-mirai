import { Request, Response } from 'express';
import * as missionService from '../services/mission.service';

// Récupérer toutes les missions
export const getAllMissions = async (req: Request, res: Response) => {
  try {
    const missions = await missionService.getAllMissions();
    return res.status(200).json(missions);
  } catch (error) {
    console.error('Error retrieving missions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Récupérer une mission par ID
export const getMissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mission = await missionService.getMissionById(Number(id));
    return res.status(200).json(mission);
  } catch (error) {
    if (error instanceof Error && error.message === 'Mission not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Error retrieving mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Créer une nouvelle mission
export const createMission = async (req: Request, res: Response) => {
  try {
    const { title, description, budget, requiredSkills, category } = req.body;
    const companyId = req.user?.userId;

    if (!companyId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!title || !description || !budget || !requiredSkills || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const mission = await missionService.createMission({
      title,
      description,
      budget,
      requiredSkills,
      category,
      companyId
    });

    return res.status(201).json(mission);
  } catch (error) {
    console.error('Error creating mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Mettre à jour une mission
export const updateMission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, budget, requiredSkills, category, status } = req.body;
    const companyId = req.user?.userId;

    if (!companyId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const mission = await missionService.updateMission(parseInt(id), {
      title,
      description,
      budget,
      requiredSkills,
      category,
      status,
      companyId
    });

    return res.status(200).json(mission);
  } catch (error) {
    if (error instanceof Error && error.message === 'Mission not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Error updating mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Mettre à jour le statut d'une mission
export const updateMissionStatus = async (req: Request, res: Response) => {
  try {
    const missionId = parseInt(req.params.id);
    const { status } = req.body;

    // Vérifier que le statut est valide
    const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Statut invalide. Les statuts valides sont : pending, in_progress, completed, cancelled' 
      });
    }

    const mission = await missionService.updateMissionStatus(missionId, status);
    res.json(mission);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une mission
export const deleteMission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.userId;

    if (!companyId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await missionService.deleteMission(parseInt(id), companyId);
    return res.status(200).json({ message: 'Mission deleted successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Mission not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Error deleting mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 