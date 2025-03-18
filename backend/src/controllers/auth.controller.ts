import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { Role } from '@prisma/client';

//register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation de base
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (role !== Role.freelancer && role !== Role.company) {
      return res.status(400).json({ error: 'Role must be freelancer or company' });
    }

    const result = await authService.register({
      name,
      email,
      password,
      role
    });

    return res.status(201).json({
      message: 'Registration successful',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Email already exists') {
        return res.status(409).json({ error: error.message });
      }
      console.error('Register error details:', error.message, error.stack);
    } else {
      console.error('Unknown register error:', error);
    }
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation de base
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await authService.login({
      email,
      password,
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: error.message });
      }
    }
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};