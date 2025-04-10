import { prisma } from '../lib/prisma';
import * as matchingService from '../services/matching.service';

async function testFreelancerMatching() {
  try {
    // Récupérer toutes les missions
    const missions = await prisma.mission.findMany({
      where: { status: 'pending' }
    });

    console.log('🔍 Test du système de matching pour chaque mission :\n');

    // Tester le matching pour chaque mission
    for (const mission of missions) {
      console.log(`\n📋 Mission : ${mission.title}`);
      console.log('----------------------------------------');

      // Obtenir les suggestions de freelancers
      const suggestions = await matchingService.getFreelancerSuggestions(mission.id);

      // Afficher les résultats
      suggestions.forEach((suggestion, index) => {
        console.log(`\n${index + 1}. Freelancer : ${suggestion.name}`);
        console.log(`   Score de matching : ${(suggestion.score * 100).toFixed(1)}%`);
        console.log(`   Compétences correspondantes : ${suggestion.matchedSkills.join(', ')}`);
        if (suggestion.missingSkills.length > 0) {
          console.log(`   Compétences manquantes : ${suggestion.missingSkills.join(', ')}`);
        }
        console.log(`   Taux horaire : ${suggestion.profile.details.hourlyRate}€`);
        console.log(`   Localisation : ${suggestion.profile.details.location}`);
      });
    }

  } catch (error) {
    console.error('❌ Erreur lors du test du matching:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testFreelancerMatching();