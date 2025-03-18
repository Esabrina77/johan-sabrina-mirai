import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Récupérer toutes les missions
export const getAllMissions = async (req: Request, res: Response) => {
  try {
    const missions = await prisma.mission.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

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
    
    const mission = await prisma.mission.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        applications: true,
      },
    });

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    return res.status(200).json(mission);
  } catch (error) {
    console.error('Error retrieving mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Créer une nouvelle mission
export const createMission = async (req: Request, res: Response) => {
  try {
    const { title, description, budget } = req.body;
    // L'ID utilisateur est stocké dans req.user.userId (pas req.user.id)
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }

    // Validation basique
    if (!title || !description || !budget) {
      return res.status(400).json({ error: 'Title, description and budget are required' });
    }

    // Vérifier que le budget est un nombre positif
    const parsedBudget = parseFloat(budget);
    if (isNaN(parsedBudget) || parsedBudget <= 0) {
      return res.status(400).json({ error: 'Budget must be a positive number' });
    }

    const newMission = await prisma.mission.create({
      data: {
        title,
        description,
        budget: parsedBudget,
        userId,
        status: 'pending',
      },
    });

    return res.status(201).json(newMission);
  } catch (error) {
    console.error('Error creating mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Mettre à jour une mission
export const updateMission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, budget, status } = req.body;
    // L'ID utilisateur est stocké dans req.user.userId (pas req.user.id)
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }

    // Vérifier si la mission existe et appartient à l'utilisateur
    const mission = await prisma.mission.findUnique({
      where: { id: Number(id) },
    });

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    if (mission.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own missions' });
    }

    // Mettre à jour la mission
    const updatedMission = await prisma.mission.update({
      where: { id: Number(id) },
      data: {
        title: title || mission.title,
        description: description || mission.description,
        budget: budget ? parseFloat(budget) : mission.budget,
        status: status || mission.status,
      },
    });

    return res.status(200).json(updatedMission);
  } catch (error) {
    console.error('Error updating mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Supprimer une mission
export const deleteMission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // L'ID utilisateur est stocké dans req.user.userId (pas req.user.id)
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found in token' });
    }

    // Vérifier si la mission existe et appartient à l'utilisateur
    const mission = await prisma.mission.findUnique({
      where: { id: Number(id) },
    });

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    if (mission.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own missions' });
    }

    // Supprimer la mission
    await prisma.mission.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Mission deleted successfully' });
  } catch (error) {
    console.error('Error deleting mission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 