import { Router } from 'express';
import 'express-async-errors';
import verifyLogin from '../middlewares/ValidateFields';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import { LoginController } from '../controllers';

const router = Router();
const loginController = new LoginController();

router.post(
  '/',
  verifyRequiredFields('login'),
  verifyLogin,
  (req, res) => {
    loginController.login(req, res);
  },
);

export default router;
