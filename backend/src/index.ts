import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import missionRoutes from './routes/mission.routes';
import applicationRoutes from './routes/application.routes';
import matchingRoutes from './routes/matching.routes';
import messageRoutes from './routes/message.routes';
import reviewRoutes from './routes/review.routes';
import app from './app';

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const PORT = process.env.PORT || 3009;

// Middlewares
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('API MIRAI is running! 🚀');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 