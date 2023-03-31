import { Router } from 'express';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import { LoginController } from '../controllers';

const router = Router();
const loginController = new LoginController();

router.post('/', verifyRequiredFields('login'), (req, res) => loginController.login(req, res));

export default router;
