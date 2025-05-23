import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const user = await userService.getFullProfileByUserId(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { name, email, details } = req.body;

    if (!name && !email && !details) {
      res.status(400).json({ error: 'At least one field (name, email, or details) is required' });
      return;
    }

    const updatedProfile = await userService.updateFullProfile(userId, { name, email, details });
    res.status(200).json(updatedProfile);
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already exists') {
      res.status(409).json({ error: error.message });
      return;
    }
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: 'Current password and new password are required' });
      return;
    }

    const result = await userService.changePassword(userId, currentPassword, newPassword);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Current password is incorrect') {
        res.status(401).json({ error: error.message });
        return;
      }
      if (error.message === 'User not found') {
        res.status(404).json({ error: error.message });
        return;
      }
    }
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { password } = req.body;

    if (!password) {
      res.status(400).json({ error: 'Password is required' });
      return;
    }

    const result = await userService.deleteAccount(userId, password);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Password is incorrect') {
        res.status(401).json({ error: error.message });
        return;
      }
      if (error.message === 'User not found') {
        res.status(404).json({ error: error.message });
        return;
      }
    }
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};