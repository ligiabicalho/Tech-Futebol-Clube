import { Request } from 'express';
import { IPayload } from './IUser';

export interface IReq extends Request {
  user?: IPayload,
}
