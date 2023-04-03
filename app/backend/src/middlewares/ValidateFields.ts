import * as Joi from 'joi'; // Libs add posteriormente tem q instalar dentro do container tb!!
import { Request, Response, NextFunction } from 'express';
import Unauthorized from '../errors/Unauthorized';

const msgError = 'Invalid email or password';

const schemaLogin = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
}).messages({
  'string.min': msgError,
  'string.email': msgError,
});

function verifyLogin(req: Request, _res: Response, next: NextFunction): Response | void {
  const login = req.body;
  const { error } = schemaLogin.validate(login);
  if (error?.message) {
    throw new Unauthorized(error.message);
  }

  next();
}

export default verifyLogin;
