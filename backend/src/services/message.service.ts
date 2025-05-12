import { prisma as globalPrisma } from '../lib/prisma';
import type { PrismaClient, Prisma } from '@prisma/client';

// Créer une nouvelle conversation
export const createConversation = async (
  participantIds: number[],
  prismaClient: PrismaClient | Prisma.TransactionClient = globalPrisma
) => {
  // Vérifier si une conversation existe déjà entre ces participants
  const existingConversation = await prismaClient.conversation.findFirst({
    where: {
      participants: {
        every: {
          id: {
            in: participantIds
          }
        }
      }
    },
    include: {
      participants: true
    }
  });

  if (existingConversation) {
    return existingConversation;
  }

  // Créer une nouvelle conversation
  return prismaClient.conversation.create({
    data: {
      participants: {
        connect: participantIds.map(id => ({ id }))
      }
    },
    include: {
      participants: true
    }
  });
};

// Envoyer un message
export const sendMessage = async (senderId: number, conversationId: number, content: string) => {
  // Vérifier si l'expéditeur fait partie de la conversation
  const conversation = await globalPrisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          id: senderId
        }
      }
    }
  });

  if (!conversation) {
    throw new Error('Conversation not found or unauthorized');
  }

  // Créer le message
  return globalPrisma.message.create({
    data: {
      content,
      senderId,
      conversationId
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    }
  });
};

// Récupérer les conversations d'un utilisateur
export const getUserConversations = async (userId: number) => {
  const conversations = await globalPrisma.conversation.findMany({
    where: {
      participants: {
        some: {
          id: userId
        }
      }
    },
    include: {
      participants: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });

  // Transformer les données pour inclure le dernier message et le compteur de messages non lus
  return Promise.all(conversations.map(async (conv: any) => {
    const unreadCount = await globalPrisma.message.count({
      where: {
        conversationId: conv.id,
        senderId: {
          not: userId
        },
        read: false
      }
    });

    return {
      id: conv.id,
      participants: conv.participants,
      lastMessage: conv.messages[0] || null,
      unreadCount
    };
  }));
};

// Récupérer les messages d'une conversation
export const getConversationMessages = async (conversationId: number, userId: number) => {
  // Vérifier si l'utilisateur fait partie de la conversation
  const conversation = await globalPrisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          id: userId
        }
      }
    }
  });

  if (!conversation) {
    throw new Error('Conversation not found or unauthorized');
  }

  return globalPrisma.message.findMany({
    where: {
      conversationId
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
};

// Marquer les messages comme lus
export const markMessagesAsRead = async (conversationId: number, userId: number) => {
  // Vérifier que l'utilisateur est participant de la conversation
  const conversation = await globalPrisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          id: userId
        }
      }
    }
  });

  if (!conversation) {
    throw new Error('Conversation non trouvée ou accès non autorisé');
  }

  // Marquer tous les messages non lus comme lus
  await globalPrisma.message.updateMany({
    where: {
      conversationId,
      senderId: {
        not: userId
      },
      read: false
    },
    data: {
      read: true
    }
  });

  // Vérifier que les messages ont été mis à jour
  const messages = await globalPrisma.message.findMany({
    where: {
      conversationId,
      senderId: {
        not: userId
      }
    },
    select: {
      id: true,
      read: true
    }
  });

  return { 
    success: true,
    messagesUpdated: messages.length,
    messages
  };
}; 