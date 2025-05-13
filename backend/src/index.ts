import dotenv from 'dotenv';
import app from './app';

// Charger les variables d'environnement
dotenv.config();

// Route de base
app.get('/', (req, res) => {
  res.send('API MIRAI is running! 🚀');
});

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); 