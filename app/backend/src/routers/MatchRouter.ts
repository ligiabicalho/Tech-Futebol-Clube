import { Router } from 'express';
import TokenJWT from '../auth/TokenJWT';
import ValidateAuth from '../middlewares/ValidateAuth';
import { MatchController } from '../controllers';
import { MatchService } from '../services';

const router = Router();
const tokenJWT = new TokenJWT();
const { verifyAuth } = new ValidateAuth(tokenJWT);
const matchService = new MatchService();
const matchController = new MatchController(matchService);

router.get('/', (req, res) => matchController.getAll(req, res));
router.patch('/:id/finish', verifyAuth, (req, res) => matchController.updateProgress(req, res));

export default router;
