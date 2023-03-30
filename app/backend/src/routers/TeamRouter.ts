import { Router } from 'express';
import TeamController from '../controllers';

const router = Router();

router.get('/', (req, res) => TeamController.getAll(req, res));
router.get('/:id', (req, res) => TeamController.getById(req, res));

export default router;
