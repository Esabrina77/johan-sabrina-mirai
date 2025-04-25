export interface User {
  id: number;
  name: string;
  email: string;
  role: 'freelancer' | 'company';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface MissionData {
  title: string;
  description: string;
  budget: number;
  requiredSkills: string[];
  category: string;
}

export interface Mission extends MissionData {
  id: number;
  companyId: number;
  status: 'draft' | 'published' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: number;
  missionId: number;
  freelancerId: number;
  status: 'sent' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  freelancer?: {
    id: number;
    name: string;
  };
  mission?: {
    id: number;
    title: string;
  };
}

export interface Conversation {
  id: number;
  participants: User[];
  lastMessage?: {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
  };
  unreadCount: number;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  conversationId: number;
  createdAt: string;
  read: boolean;
}

export interface MatchingSuggestion {
  mission: Mission;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
} 