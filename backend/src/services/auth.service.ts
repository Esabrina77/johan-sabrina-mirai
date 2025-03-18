import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export const register = async (data: RegisterData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  const token = generateToken(user.id, user.role);

  return {
    user,
    token,
  };
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id, user.role);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const verifyEmail = async (code: string) => {
  // Recherche simplifiée pour éviter l'erreur de colonne
  const users = await prisma.user.findMany({
    where: {
      verificationCode: code,
      emailVerificationExpires: {
        gt: new Date(),
      },
    },
    take: 1
  });
  
  const user = users.length > 0 ? users[0] : null;

  if (!user) {
    throw new Error('Invalid or expired code');
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationCode: null,
      emailVerificationExpires: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
    },
  });

  return updatedUser;
};
