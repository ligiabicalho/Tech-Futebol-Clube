import { Router } from 'express';
import 'express-async-errors';
import ValidateAuth from '../middlewares/ValidateAuth';
import verifyLogin from '../middlewares/ValidateFields';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import { LoginController } from '../controllers';
import TokenJWT from '../auth/TokenJWT';

const router = Router();
const tokenJWT = new TokenJWT();
const { verifyAuth } = new ValidateAuth(tokenJWT);
const loginController = new LoginController(tokenJWT);

router.post(
  '/',
  verifyRequiredFields('login'),
  verifyLogin,
  (req, res) => loginController.login(req, res),
);
router.get(
  '/role',
  verifyAuth,
  (req, res) => LoginController.getRole(req, res),
);

export default router;
