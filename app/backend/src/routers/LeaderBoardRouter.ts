import { Router } from 'express';
import { LeaderBoardController } from '../controllers';

const router = Router();
const leaderBoardController = new LeaderBoardController();

router.get('/', (req, res) => leaderBoardController.getLeaderBoardGeral(req, res));
router.get('/home', (req, res) => leaderBoardController.getLeaderBoard(req, res));
router.get('/away', (req, res) => leaderBoardController.getLeaderBoard(req, res));

export default router;
