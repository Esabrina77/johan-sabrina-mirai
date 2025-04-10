import { prisma } from '../lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

interface CreateMissionData {
  title: string;
  description: string;
  budget: number;
  requiredSkills: string[];
  category: string;
  companyId: number;
}

interface UpdateMissionData {
  title?: string;
  description?: string;
  budget?: number;
  requiredSkills?: string[];
  category?: string;
  status?: string;
  companyId: number;
}

export const createMission = async (data: CreateMissionData) => {
  return prisma.mission.create({
    data: {
      title: data.title,
      description: data.description,
      budget: new Decimal(data.budget),
      requiredSkills: data.requiredSkills,
      category: data.category,
      companyId: data.companyId,
      status: 'pending'
    }
  });
};

export const updateMission = async (id: number, data: UpdateMissionData) => {
  // Vérifier si la mission existe et appartient à l'entreprise
  const mission = await prisma.mission.findUnique({
    where: { id }
  });

  if (!mission) {
    throw new Error('Mission not found');
  }

  if (mission.companyId !== data.companyId) {
    throw new Error('Unauthorized: You can only update your own missions');
  }

  return prisma.mission.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      budget: data.budget ? new Decimal(data.budget) : undefined,
      requiredSkills: data.requiredSkills,
      category: data.category,
      status: data.status as any
    }
  });
};

export const deleteMission = async (id: number, companyId: number) => {
  const mission = await prisma.mission.findUnique({
    where: { id }
  });

  if (!mission) {
    throw new Error('Mission not found');
  }

  if (mission.companyId !== companyId) {
    throw new Error('Unauthorized: You can only delete your own missions');
  }

  return prisma.mission.delete({
    where: { id }
  });
};

export const getAllMissions = async () => {
  return prisma.mission.findMany({
    include: {
      company: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
};

export const getMissionById = async (id: number) => {
  const mission = await prisma.mission.findUnique({
    where: { id },
    include: {
      company: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!mission) {
    throw new Error('Mission not found');
  }

  return mission;
};

export const updateMissionStatus = async (missionId: number, status: 'pending' | 'in_progress' | 'completed' | 'cancelled') => {
  // Vérifier que la mission existe
  const mission = await prisma.mission.findUnique({
    where: { id: missionId }
  });

  if (!mission) {
    throw new Error('Mission non trouvée');
  }

  // Mettre à jour le statut
  return prisma.mission.update({
    where: { id: missionId },
    data: { status },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      applications: {
        where: {
          status: 'accepted'
        },
        include: {
          freelancer: {
            select: {
              id: true,
              name: true,
              role: true
            }
          }
        }
      }
    }
  });
}; 