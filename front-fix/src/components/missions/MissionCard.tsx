import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';

interface MissionCardProps {
  mission: {
    id: number;
    title: string;
    description: string;
    budget: number;
    requiredSkills: string[];
    category: string;
    duration: string;
    matchScore?: number;
  };
  showMatchScore?: boolean;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, showMatchScore = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{mission.title}</h3>
        <span className="text-lg font-bold text-primary">{formatCurrency(mission.budget)}</span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{mission.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {mission.requiredSkills.map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{mission.category}</span>
        <span>{mission.duration}</span>
      </div>

      {showMatchScore && mission.matchScore !== undefined && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${mission.matchScore * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            Match: {Math.round(mission.matchScore * 100)}%
          </span>
        </div>
      )}

      <Link 
        href={`/missions/${mission.id}`}
        className="block w-full text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
      >
        Voir les détails
      </Link>
    </div>
  );
}; 