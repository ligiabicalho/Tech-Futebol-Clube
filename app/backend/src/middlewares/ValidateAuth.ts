import { Response, NextFunction } from 'express';
import Unauthorized from '../errors/Unauthorized';
import { ITokenJWT, IReq, IPayload } from '../interfaces';

export default class ValidateAuth {
  private _tokenJWT: ITokenJWT;
  constructor(tokenJWT: ITokenJWT) {
    this._tokenJWT = tokenJWT;
  }

  // callback  != function
  verifyAuth = (req: IReq, _res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;
    if (!authorization) throw new Unauthorized('Token not found');

    const decoded: IPayload = this._tokenJWT.validateToken(authorization);
    req.user = decoded;
    next();
  };
}
