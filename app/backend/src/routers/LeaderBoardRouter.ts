import { Router } from 'express';
import { LeaderBoardController } from '../controllers';

const router = Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', (req, res) => leaderBoardController.getAll(req, res));

export default router;
