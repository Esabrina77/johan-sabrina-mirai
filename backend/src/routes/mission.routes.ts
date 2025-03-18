import { Router, RequestHandler } from 'express';
import * as missionController from '../controllers/mission.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { isCompany } from '../middleware/role.middleware';

const router = Router();

// Route pour récupérer toutes les missions (accessible sans authentification)
router.get('/', missionController.getAllMissions as unknown as RequestHandler);

// Route pour récupérer une mission spécifique par ID (accessible sans authentification)
router.get('/:id', missionController.getMissionById as unknown as RequestHandler);

// Routes protégées nécessitant une authentification ET un rôle d'entreprise
router.post('/', authenticateToken, isCompany, missionController.createMission as unknown as RequestHandler);
router.patch('/:id', authenticateToken, isCompany, missionController.updateMission as unknown as RequestHandler);
router.delete('/:id', authenticateToken, isCompany, missionController.deleteMission as unknown as RequestHandler);

export default router; 