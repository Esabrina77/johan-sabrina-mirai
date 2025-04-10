import { prisma } from '../lib/prisma';

// Créer une nouvelle conversation
export const createConversation = async (participantIds: number[]) => {
  // Vérifier si une conversation existe déjà entre ces participants
  const existingConversation = await prisma.conversation.findFirst({
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
  return prisma.conversation.create({
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
  const conversation = await prisma.conversation.findFirst({
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
  return prisma.message.create({
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
  return prisma.conversation.findMany({
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
        take: 1
      }
    }
  });
};

// Récupérer les messages d'une conversation
export const getConversationMessages = async (conversationId: number, userId: number) => {
  // Vérifier si l'utilisateur fait partie de la conversation
  const conversation = await prisma.conversation.findFirst({
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

  return prisma.message.findMany({
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
  const conversation = await prisma.conversation.findFirst({
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
  await prisma.message.updateMany({
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
  const messages = await prisma.message.findMany({
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