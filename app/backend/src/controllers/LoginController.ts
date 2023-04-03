import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { UserService } from '../services';
import { IPayload } from '../interfaces/IUser';
import TokenJWT from '../auth/TokenJWT';
import Unauthorized from '../errors/Unauthorized';

export default class LoginController {
  private _tokenJWT: TokenJWT;
  private _service: UserService;
  constructor() {
    this._service = new UserService();
    this._tokenJWT = new TokenJWT();
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await this._service.login({ email, password });

    const { id, username, role } = user;
    const payload: IPayload = { id, username, email, role };
    const token = this._tokenJWT.generateToken(payload);

    if (!token) {
      throw new Unauthorized('Token not found');
    }
    res.status(statusCodes.OK).json({ token });
    // .redirect('/matches');
  }

  async getRole(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) throw new Unauthorized('Token not found');

    const decoded = this._tokenJWT.validateToken(authorization);
    res.status(statusCodes.OK).json({ role: decoded.role });
  }
}
