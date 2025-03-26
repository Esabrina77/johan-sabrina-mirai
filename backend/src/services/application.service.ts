import { prisma } from '../lib/prisma';
import { ApplicationStatus } from '@prisma/client';

export const applyToMission = async (userId: number, missionId: number) => {
  // Vérifier si l'utilisateur a déjà postulé à cette mission
  const existingApplication = await prisma.application.findFirst({
    where: {
      userId,
      missionId,
    },
  });

  if (existingApplication) {
    throw new Error('You have already applied to this mission');
  }

  // Vérifier si la mission existe
  const mission = await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
  });

  if (!mission) {
    throw new Error('Mission not found');
  }

  // Créer la candidature
  const application = await prisma.application.create({
    data: {
      userId,
      missionId,
      status: ApplicationStatus.sent,
    },
    include: {
      mission: {
        select: {
          title: true,
          description: true,
          budget: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return application;
};

// Obtenir les candidatures reçues (pour les entreprises)
export const getReceivedApplications = async (companyId: number) => {
  const applications = await prisma.application.findMany({
    where: {
      mission: {
        userId: companyId,
      },
    },
    include: {
      mission: {
        select: {
          title: true,
          description: true,
          budget: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      dateApplied: 'desc',
    },
  });

  return applications;
};

// Obtenir les candidatures soumises (pour les freelancers)
export const getSentApplications = async (freelancerId: number) => {
  const applications = await prisma.application.findMany({
    where: {
      userId: freelancerId,
    },
    include: {
      mission: {
        select: {
          title: true,
          description: true,
          budget: true,
        },
      },
    },
    orderBy: {
      dateApplied: 'desc',
    },
  });

  return applications;
};

// Mettre à jour le statut d'une candidature (pour les entreprises)
export const updateApplicationStatus = async (
  applicationId: number,
  status: ApplicationStatus,
  companyId: number
) => {
  // Vérifier si la candidature existe et appartient à une mission de l'entreprise
  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      mission: {
        userId: companyId,
      },
    },
  });

  if (!application) {
    throw new Error('Application not found');
  }

  // Mettre à jour le statut de la candidature
  const updatedApplication = await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
    include: {
      mission: {
        select: {
          title: true,
          description: true,
          budget: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return updatedApplication;
};
