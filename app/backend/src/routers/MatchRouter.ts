import { Router } from 'express';
import { MatchController } from '../controllers';
import { MatchService } from '../services';

const router = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

router.get('/', (req, res) => matchController.getAll(req, res));

export default router;
