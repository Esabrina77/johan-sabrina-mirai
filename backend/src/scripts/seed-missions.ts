import { prisma } from '../lib/prisma';

async function seedMissions() {
  try {
    // Trouver une entreprise (assurez-vous d'avoir au moins une entreprise dans la base)
    const company = await prisma.user.findFirst({
      where: { role: 'company' }
    });

    if (!company) {
      throw new Error('Aucune entreprise trouvée dans la base de données');
    }

    // Créer des missions avec les nouveaux champs
    const missions = await Promise.all([
      prisma.mission.create({
        data: {
          title: "Développement d'une application mobile",
          description: "Nous recherchons un développeur mobile pour créer une application iOS et Android.",
          budget: 5000,
          requiredSkills: ["mobile", "android", "ios", "react", "typescript"],
          category: "développement",
          companyId: company.id
        }
      }),
      prisma.mission.create({
        data: {
          title: "Design d'interface utilisateur",
          description: "Création d'une interface utilisateur moderne pour une application web.",
          budget: 2000,
          requiredSkills: ["ui", "ux", "figma", "design", "prototype"],
          category: "design",
          companyId: company.id
        }
      }),
      prisma.mission.create({
        data: {
          title: "Rédaction de contenu marketing",
          description: "Rédaction d'articles de blog et de contenu pour les réseaux sociaux.",
          budget: 1500,
          requiredSkills: ["rédaction", "marketing", "seo", "social media"],
          category: "marketing",
          companyId: company.id
        }
      })
    ]);

    console.log('✅ Nouvelles missions créées avec succès:', missions);
  } catch (error) {
    console.error('❌ Erreur lors de la création des missions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedMissions(); 