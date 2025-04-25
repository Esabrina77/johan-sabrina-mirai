export interface User {
  id: number;
  name: string;
  email: string;
  role: 'company' | 'freelancer';
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  conversationId: number;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: number;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
} 