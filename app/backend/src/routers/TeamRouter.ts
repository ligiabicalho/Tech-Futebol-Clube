import { Router } from 'express';
import { TeamController } from '../controllers';

const router = Router();
const teamController = new TeamController();

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
