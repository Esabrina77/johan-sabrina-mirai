import { prisma } from '../lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

interface MatchingScore {
  missionId: number;
  score: number;
  title: string;
  description: string;
  budget: number;
  matchedSkills: string[];
  missingSkills: string[];
}

interface FreelancerMatch {
  freelancerId: number;
  name: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  profile: any;
}

// Obtenir les suggestions de missions pour un freelancer
export const getMissionSuggestions = async (freelancerId: number): Promise<MatchingScore[]> => {
  // Récupérer toutes les missions disponibles
  const availableMissions = await prisma.mission.findMany({
    where: {
      status: 'pending',
    },
    select: {
      id: true,
      title: true,
      description: true,
      budget: true,
    },
  });

  // Calculer le score de matching pour chaque mission
  const matchingScores = await Promise.all(
    availableMissions.map(async (mission) => {
      const { score, matchedSkills, missingSkills } = await calculateMatchingScore(freelancerId, mission.id);
      return {
        missionId: mission.id,
        score,
        title: mission.title,
        description: mission.description,
        budget: Number(mission.budget),
        matchedSkills,
        missingSkills
      };
    })
  );

  // Trier par score décroissant et retourner les 10 meilleures suggestions
  return matchingScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

// Obtenir les suggestions de freelancers pour une mission
export const getFreelancerSuggestions = async (missionId: number): Promise<FreelancerMatch[]> => {
  // Récupérer la mission
  const mission = await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
  });

  if (!mission) {
    throw new Error('Mission not found');
  }

  // Récupérer tous les freelancers disponibles
  const availableFreelancers = await prisma.user.findMany({
    where: {
      role: 'freelancer',
      profile: {
        isNot: null
      }
    },
    include: {
      profile: true
    }
  });

  // Calculer le score de matching pour chaque freelancer
  const matchingScores = await Promise.all(
    availableFreelancers.map(async (freelancer) => {
      const { score, matchedSkills, missingSkills } = await calculateMatchingScore(freelancer.id, missionId);
      return {
        freelancerId: freelancer.id,
        name: freelancer.name,
        score,
        matchedSkills,
        missingSkills,
        profile: freelancer.profile
      };
    })
  );

  // Trier par score décroissant et retourner les 10 meilleurs freelancers
  return matchingScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

// Obtenir le score de matching pour une mission spécifique
export const getMatchingScore = async (freelancerId: number, missionId: number): Promise<number> => {
  const { score } = await calculateMatchingScore(freelancerId, missionId);
  return score;
};

// Fonction privée pour calculer le score de matching
async function calculateMatchingScore(freelancerId: number, missionId: number): Promise<{
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
}> {
  // Récupérer les informations du freelancer
  const freelancer = await prisma.user.findUnique({
    where: {
      id: freelancerId,
    },
    include: {
      profile: true,
    },
  });

  if (!freelancer?.profile?.details) {
    return { score: 0, matchedSkills: [], missingSkills: [] };
  }

  // Récupérer les informations de la mission
  const mission = await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
    include: {
      company: {
        include: {
          profile: true
        }
      }
    }
  });

  if (!mission?.company?.profile?.details) {
    return { score: 0, matchedSkills: [], missingSkills: [] };
  }

  // Calculer les différents scores
  const { score: skillsScore, matchedSkills, missingSkills } = calculateSkillsMatch(
    mission.requiredSkills.map(skill => skill.toLowerCase()),
    extractSkillsFromProfile(freelancer.profile.details)
  );

  const budgetScore = calculateBudgetScore(mission.budget);
  const locationScore = calculateLocationScore(
    (freelancer.profile.details as any).location,
    (mission.company.profile.details as any).location
  );
  const experienceScore = calculateExperienceScore(freelancer.profile.details);

  // Calculer le score final avec les nouveaux poids
  const finalScore = (
    (skillsScore * 0.5) +      // Compétences (50%)
    (budgetScore * 0.2) +      // Budget (20%)
    (locationScore * 0.15) +   // Localisation (15%)
    (experienceScore * 0.15)   // Expérience (15%)
  );

  return { score: finalScore, matchedSkills, missingSkills };
}

// Fonction utilitaire pour extraire les compétences d'une description
function extractSkillsFromDescription(description: string): string[] {
  // Mots à ignorer (articles, prépositions, etc.)
  const stopWords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'en', 'et', 'ou', 'mais', 'donc', 'car', 'ni', 'or'];
  
  // Compétences techniques courantes
  const techSkills = [
    'javascript', 'typescript', 'react', 'angular', 'vue',
    'nodejs', 'python', 'java', 'php', 'ruby',
    'sql', 'mongodb', 'postgresql', 'redis',
    'docker', 'kubernetes', 'aws', 'azure',
    'git', 'cicd', 'agile', 'scrum',
    'mobile', 'android', 'ios', 'flutter',
    'html', 'css', 'frontend', 'backend',
    'fullstack', 'devops', 'ui', 'ux'
  ];
  
  // Extraire les mots significatifs de la description
  const words = description.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Enlever la ponctuation
    .split(/\s+/)
    .filter(word => 
      word.length > 3 && // Mots de plus de 3 lettres
      !stopWords.includes(word) && // Ignorer les mots vides
      !/^\d+$/.test(word) // Ignorer les nombres purs
    );

  // Trouver les compétences techniques dans les mots
  const foundSkills = words.filter(word => 
    techSkills.some(skill => 
      word.includes(skill) || skill.includes(word)
    )
  );

  // Éliminer les doublons et trier
  return [...new Set(foundSkills)].sort();
}

// Fonction utilitaire pour extraire les compétences du profil
function extractSkillsFromProfile(profileDetails: any): string[] {
  if (!profileDetails || !profileDetails.skills) {
    return [];
  }
  return profileDetails.skills.map((skill: string) => skill.toLowerCase());
}

// Fonction utilitaire pour calculer la correspondance des compétences
function calculateSkillsMatch(requiredSkills: string[], freelancerSkills: string[]): {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
} {
  if (requiredSkills.length === 0) {
    return { score: 0, matchedSkills: [], missingSkills: [] };
  }
  
  // Trouver les compétences correspondantes
  const matchedSkills = requiredSkills.filter(skill => 
    freelancerSkills.some(freelancerSkill => 
      freelancerSkill.includes(skill) || skill.includes(freelancerSkill)
    )
  );

  // Trouver les compétences manquantes
  const missingSkills = requiredSkills.filter(skill => 
    !matchedSkills.includes(skill)
  );
  
  return {
    score: matchedSkills.length / requiredSkills.length,
    matchedSkills,
    missingSkills
  };
}

// Fonction utilitaire pour calculer le score de budget
function calculateBudgetScore(budget: Decimal): number {
  const maxBudget = 10000;
  return Math.min(Number(budget) / maxBudget, 1);
}

// Nouvelle fonction pour calculer le score de localisation
function calculateLocationScore(freelancerLocation: string, companyLocation: string): number {
  if (!freelancerLocation || !companyLocation) return 0.5;

  // Extraire les villes des localisations
  const freelancerCity = freelancerLocation.split(',')[0].trim().toLowerCase();
  const companyCity = companyLocation.split(',')[0].trim().toLowerCase();

  // Même ville = score parfait
  if (freelancerCity === companyCity) return 1;

  // Même pays = score moyen
  const freelancerCountry = freelancerLocation.split(',')[1]?.trim().toLowerCase();
  const companyCountry = companyLocation.split(',')[1]?.trim().toLowerCase();
  if (freelancerCountry === companyCountry) return 0.7;

  // Continent différent = score faible
  return 0.3;
}

// Nouvelle fonction pour calculer le score d'expérience
function calculateExperienceScore(profileDetails: any): number {
  if (!profileDetails) return 0.5;

  // Vérifier si le profil contient des informations d'expérience
  const hasExperience = profileDetails.experience || profileDetails.yearsOfExperience;
  
  if (!hasExperience) return 0.5;

  // Si l'expérience est en années
  if (typeof hasExperience === 'number') {
    if (hasExperience >= 5) return 1;
    if (hasExperience >= 3) return 0.8;
    if (hasExperience >= 1) return 0.6;
    return 0.4;
  }

  // Si l'expérience est un objet avec plus de détails
  if (typeof hasExperience === 'object') {
    const years = hasExperience.years || 0;
    const projects = hasExperience.projects || 0;
    const certifications = hasExperience.certifications || 0;

    let score = 0.5;
    
    // Ajuster le score en fonction des années d'expérience
    if (years >= 5) score += 0.3;
    else if (years >= 3) score += 0.2;
    else if (years >= 1) score += 0.1;

    // Ajuster le score en fonction du nombre de projets
    if (projects >= 10) score += 0.2;
    else if (projects >= 5) score += 0.1;

    // Ajuster le score en fonction des certifications
    if (certifications >= 3) score += 0.2;
    else if (certifications >= 1) score += 0.1;

    return Math.min(score, 1);
  }

  return 0.5;
}