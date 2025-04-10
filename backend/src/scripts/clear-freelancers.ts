import { prisma } from '../lib/prisma';

async function clearFreelancers() {
  try {
    // Supprimer d'abord les applications associées aux freelancers
    await prisma.application.deleteMany({
      where: {
        freelancer: {
          role: 'freelancer'
        }
      }
    });

    // Supprimer les profils des freelancers
    await prisma.profile.deleteMany({
      where: {
        user: {
          role: 'freelancer'
        }
      }
    });

    // Supprimer les freelancers
    await prisma.user.deleteMany({
      where: {
        role: 'freelancer'
      }
    });

    console.log('✅ Tous les freelancers ont été supprimés avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression des freelancers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearFreelancers(); 