import { prisma } from '../lib/prisma';
import { ReviewType } from '@prisma/client';

// Créer un nouvel avis
export const createReview = async (
  userId: number,
  reviewerId: number,
  missionId: number,
  rating: number,
  comment?: string
) => {
  // Vérifier que la mission existe et est terminée
  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
    include: {
      company: true,
      applications: {
        where: {
          status: 'accepted'
        },
        include: {
          freelancer: true
        }
      }
    }
  });

  if (!mission) {
    throw new Error('Mission non trouvée');
  }

  if (mission.status !== 'completed') {
    throw new Error('La mission doit être terminée pour laisser un avis');
  }

  // Vérifier que l'utilisateur est impliqué dans la mission
  const isCompany = mission.company.id === reviewerId;
  const isFreelancer = mission.applications.some(app => app.freelancer.id === reviewerId);

  if (!isCompany && !isFreelancer) {
    throw new Error('Vous n\'êtes pas autorisé à laisser un avis pour cette mission');
  }

  // Si c'est l'entreprise qui laisse l'avis, vérifier que userId est bien le freelancer
  if (isCompany) {
    const validFreelancer = mission.applications.some(app => app.freelancer.id === userId);
    if (!validFreelancer) {
      throw new Error('Vous ne pouvez laisser un avis que pour le freelancer qui a réalisé la mission');
    }
  }

  // Si c'est le freelancer qui laisse l'avis, vérifier que userId est bien l'entreprise
  if (isFreelancer) {
    if (userId !== mission.company.id) {
      throw new Error('Vous ne pouvez laisser un avis que pour l\'entreprise de la mission');
    }
  }

  // Vérifier qu'un avis n'existe pas déjà
  const existingReview = await prisma.review.findFirst({
    where: {
      missionId,
      reviewerId
    }
  });

  if (existingReview) {
    throw new Error('Vous avez déjà laissé un avis pour cette mission');
  }

  // Déterminer le type d'avis
  const type = isCompany ? 'company_to_freelancer' : 'freelancer_to_company';

  // Créer l'avis
  const review = await prisma.review.create({
    data: {
      userId,
      reviewerId,
      missionId,
      rating,
      comment,
      type: type as ReviewType
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      reviewer: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    }
  });

  return review;
};

// Obtenir les avis d'un utilisateur
export const getUserReviews = async (userId: number) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      reviewer: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      mission: {
        select: {
          id: true,
          title: true,
          status: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });

  // Calculer la moyenne des notes
  const ratings = reviews.map(review => review.rating);
  const averageRating = ratings.length > 0
    ? ratings.reduce((a, b) => a + b) / ratings.length
    : 0;

  return {
    reviews,
    averageRating,
    totalReviews: reviews.length
  };
};

// Obtenir les avis d'une mission
export const getMissionReviews = async (missionId: number) => {
  return prisma.review.findMany({
    where: {
      missionId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      reviewer: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });
}; 