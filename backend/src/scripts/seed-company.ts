import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

async function seedCompany() {
  try {
    // Vérifier si une entreprise existe déjà
    const existingCompany = await prisma.user.findFirst({
      where: { role: 'company' }
    });

    if (existingCompany) {
      console.log('✅ Une entreprise existe déjà dans la base de données');
      return;
    }

    // Créer une entreprise de test
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const company = await prisma.user.create({
      data: {
        email: 'company@test.com',
        password: hashedPassword,
        name: 'Test Company',
        role: 'company',
        profile: {
          create: {
            type: 'company',
            details: {
              description: 'Une entreprise de test pour le développement',
              website: 'https://testcompany.com',
              location: 'Paris, France'
            }
          }
        }
      }
    });

    console.log('✅ Entreprise créée avec succès:', company);
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'entreprise:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCompany(); 