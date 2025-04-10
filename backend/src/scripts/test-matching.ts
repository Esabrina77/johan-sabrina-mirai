import { prisma } from '../lib/prisma';
import * as matchingService from '../services/matching.service';

async function testMatching() {
  try {
    // Récupérer tous les freelancers
    const freelancers = await prisma.user.findMany({
      where: { role: 'freelancer' },
      include: { profile: true }
    });

    console.log('🔍 Test du système de matching pour chaque freelancer :\n');

    // Tester le matching pour chaque freelancer
    for (const freelancer of freelancers) {
      console.log(`\n👤 Freelancer : ${freelancer.name}`);
      console.log('----------------------------------------');

      // Obtenir les suggestions de missions
      const suggestions = await matchingService.getMissionSuggestions(freelancer.id);

      // Afficher les résultats
      suggestions.forEach((suggestion, index) => {
        console.log(`\n${index + 1}. Mission : ${suggestion.title}`);
        console.log(`   Score de matching : ${(suggestion.score * 100).toFixed(1)}%`);
        console.log(`   Budget : ${suggestion.budget}€`);
        console.log(`   Compétences correspondantes : ${suggestion.matchedSkills.join(', ')}`);
        if (suggestion.missingSkills.length > 0) {
          console.log(`   Compétences manquantes : ${suggestion.missingSkills.join(', ')}`);
        }
      });
    }

  } catch (error) {
    console.error('❌ Erreur lors du test du matching:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testMatching(); 