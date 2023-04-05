import { IPayload } from './IUser';

export type IToken = string;

export interface ITokenJWT {
  generateToken(payload: IPayload): IToken,
  validateToken(token: IToken): IPayload,
}
