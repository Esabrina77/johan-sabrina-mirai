import { prisma } from '../lib/prisma';

async function clearMissions() {
  try {
    // Supprimer toutes les applications d'abord (à cause des contraintes de clé étrangère)
    await prisma.application.deleteMany();
    
    // Supprimer toutes les missions
    await prisma.mission.deleteMany();
    
    console.log('✅ Toutes les missions ont été supprimées');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression des missions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearMissions(); 