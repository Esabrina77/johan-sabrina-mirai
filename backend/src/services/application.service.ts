import { prisma } from '../lib/prisma';
import { ApplicationStatus } from '@prisma/client';

export const applyToMission = async (freelancerId: number, missionId: number) => {
  // Vérifier si l'utilisateur a déjà postulé à cette mission
  const existingApplication = await prisma.application.findFirst({
    where: {
      freelancerId,
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
  return prisma.application.create({
    data: {
      freelancerId,
      missionId,
      status: ApplicationStatus.sent,
    },
  });
};

export const getFreelancerApplications = async (freelancerId: number) => {
  return prisma.application.findMany({
    where: {
      freelancerId,
    },
    include: {
      mission: true,
    },
  });
};

export const getCompanyApplications = async (companyId: number) => {
  return prisma.application.findMany({
    where: {
      mission: {
        companyId,
      },
    },
    include: {
      mission: true,
      freelancer: {
        select: {
          id: true,
          name: true,
          profile: true,
        },
      },
    },
  });
};

export const updateApplicationStatus = async (applicationId: number, status: 'sent' | 'accepted' | 'rejected', companyId: number) => {
  // Vérifier que la candidature existe
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      mission: true
    }
  });

  if (!application) {
    throw new Error('Candidature non trouvée');
  }

  // Vérifier que l'entreprise est propriétaire de la mission
  if (application.mission.companyId !== companyId) {
    throw new Error('Vous n\'êtes pas autorisé à modifier cette candidature');
  }

  // Mettre à jour le statut
  return prisma.application.update({
    where: { id: applicationId },
    data: { status },
    include: {
      freelancer: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      mission: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true
        }
      }
    }
  });
};

// Obtenir les candidatures reçues pour une entreprise
export const getReceivedApplications = async (companyId: number) => {
  return prisma.application.findMany({
    where: {
      mission: {
        companyId: companyId
      }
    },
    include: {
      mission: true,
      freelancer: {
        include: {
          profile: true
        }
      }
    }
  });
};

// Obtenir les candidatures envoyées par un freelancer
export const getSentApplications = async (freelancerId: number) => {
  return prisma.application.findMany({
    where: {
      freelancerId: freelancerId
    },
    include: {
      mission: {
        include: {
          company: {
            include: {
              profile: true
            }
          }
        }
      }
    }
  });
};
