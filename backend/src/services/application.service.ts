import { prisma } from '../lib/prisma';
import { ApplicationStatus } from '@prisma/client';
import { createConversation } from './message.service';

export const applyToMission = async (freelancerId: number, missionId: number, message: string) => {
  console.log('Début de applyToMission:', { freelancerId, missionId, message });

  // Vérifier si l'utilisateur a déjà postulé à cette mission
  const existingApplication = await prisma.application.findFirst({
    where: {
      freelancerId,
      missionId,
    },
  });

  if (existingApplication) {
    throw new Error('Vous avez déjà postulé à cette mission');
  }

  // Vérifier si la mission existe
  const mission = await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
    include: {
      company: true
    }
  });

  if (!mission) {
    throw new Error('Mission non trouvée');
  }

  console.log('Mission trouvée:', mission);

  try {
    // Créer la candidature et la conversation en même temps
    const result = await prisma.$transaction(async (tx) => {
      // 1. Créer la candidature
      const application = await tx.application.create({
    data: {
      freelancerId,
      missionId,
      status: ApplicationStatus.sent,
    },
  });

      console.log('Candidature créée:', application);

      // 2. Utiliser createConversation du service message avec le client transactionnel
      const conversation = await createConversation([freelancerId, mission.company.id], tx);
      console.log('Conversation (unique) obtenue:', conversation);

      // 3. Créer le premier message avec la candidature
      const firstMessage = await tx.message.create({
        data: {
          content: message,
          senderId: freelancerId,
          conversationId: conversation.id
        }
      });

      console.log('Message créé:', firstMessage);

      return application;
    });

    return result;
  } catch (error) {
    console.error('Erreur dans la transaction:', error);
    throw new Error('Erreur lors de la création de la candidature et de la conversation');
  }
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
