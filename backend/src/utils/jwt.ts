//gestion des tokens jwt
// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

//generation du token   
export const generateToken = (userId: number): string => {
  // @ts-ignore
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

//verification du token
export const verifyToken = (token: string): { userId: number } => {
  try {
    // @ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};