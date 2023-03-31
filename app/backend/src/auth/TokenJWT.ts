import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IDecoded, IPayload } from '../interfaces/IUser';

dotenv.config();

export default class TokenJWT {
  private _jwt = jwt;
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'secret';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '48h',
    };
  }

  generateToken(payload: IPayload): string {
    const token = this._jwt.sign(payload, this._secret, this._options);
    return token;
  }

  validateToken(token: string): IDecoded {
    return this._jwt.verify(token, this._secret) as IDecoded;
  }
}
