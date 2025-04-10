import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

async function seedFreelancers() {
  try {
    // Créer trois freelancers avec des compétences différentes
    const freelancers = await Promise.all([
      // Freelancer 1 : Développeur Mobile
      prisma.user.create({
        data: {
          email: 'mobile.dev@test.com',
          password: await bcrypt.hash('password123', 10),
          name: 'John Mobile',
          role: 'freelancer',
          profile: {
            create: {
              type: 'freelancer',
              details: {
                description: 'Développeur mobile expérimenté',
                skills: ['mobile', 'android', 'ios', 'react', 'typescript', 'flutter'],
                hourlyRate: 80,
                location: 'Paris, France',
                experience: {
                  years: 5,
                  projects: 15,
                  certifications: 3
                }
              }
            }
          }
        }
      }),

      // Freelancer 2 : Designer UI/UX
      prisma.user.create({
        data: {
          email: 'designer@test.com',
          password: await bcrypt.hash('password123', 10),
          name: 'Sarah Designer',
          role: 'freelancer',
          profile: {
            create: {
              type: 'freelancer',
              details: {
                description: 'Designer UI/UX créatif',
                skills: ['ui', 'ux', 'figma', 'design', 'prototype', 'user research'],
                hourlyRate: 70,
                location: 'Lyon, France',
                experience: {
                  years: 3,
                  projects: 8,
                  certifications: 2
                }
              }
            }
          }
        }
      }),

      // Freelancer 3 : Marketing Digital
      prisma.user.create({
        data: {
          email: 'marketer@test.com',
          password: await bcrypt.hash('password123', 10),
          name: 'Mike Marketer',
          role: 'freelancer',
          profile: {
            create: {
              type: 'freelancer',
              details: {
                description: 'Expert en marketing digital',
                skills: ['marketing', 'seo', 'social media', 'content writing', 'analytics'],
                hourlyRate: 60,
                location: 'Bordeaux, France',
                experience: {
                  years: 4,
                  projects: 12,
                  certifications: 4
                }
              }
            }
          }
        }
      })
    ]);

    console.log('✅ Freelancers créés avec succès:', freelancers);
  } catch (error) {
    console.error('❌ Erreur lors de la création des freelancers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFreelancers(); 