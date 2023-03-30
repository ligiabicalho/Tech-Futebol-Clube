import { Router } from 'express';
import TeamController from '../controllers';

const router = Router();

router.get('/', (req, res, next) => TeamController.getAll(req, res, next));

export default router;
