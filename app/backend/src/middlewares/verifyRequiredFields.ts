import { Request, Response, NextFunction } from 'express';
import BadRequest from '../errors/BadRequest';

const requestRequiredFields = {
  user: ['username', 'role', 'email', 'password'],
  login: ['email', 'password'],
};

const verifyRequiredFields = (key: keyof typeof requestRequiredFields) =>
  (req: Request, _res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[key];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        throw new BadRequest('All fields must be filled');
      }
    }
    next();
  };

export default verifyRequiredFields;
