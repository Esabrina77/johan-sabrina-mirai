import { Request, Response } from 'express';
import * as reviewService from '../services/review.service';

// Créer un nouvel avis
export const createReview = async (req: Request, res: Response) => {
  try {
    const { missionId, rating, comment, userId } = req.body;
    const reviewerId = (req as any).user.userId; // Récupérer l'ID depuis le token JWT

    // Valider la note
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'La note doit être comprise entre 1 et 5' });
    }

    const review = await reviewService.createReview(
      userId,
      reviewerId,
      missionId,
      rating,
      comment
    );

    res.status(201).json(review);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir les avis d'un utilisateur
export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const reviews = await reviewService.getUserReviews(userId);
    res.json(reviews);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir les avis d'une mission
export const getMissionReviews = async (req: Request, res: Response) => {
  try {
    const missionId = parseInt(req.params.missionId);
    const reviews = await reviewService.getMissionReviews(missionId);
    res.json(reviews);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}; 