import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { UserService } from '../services';
import { IPayload } from '../interfaces/IUser';
import TokenJWT from '../auth/TokenJWT';
import Unauthorized from '../errors/Unauthorized';
import { IReq } from '../interfaces/IReq';

export default class LoginController {
  private _service: UserService;
  constructor(private _tokenJWT: TokenJWT) {
    this._service = new UserService();
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await this._service.login({ email, password });

    const { id, username, role } = user;
    const payload: IPayload = { id, username, email, role };
    const token = await this._tokenJWT.generateToken(payload);

    res.status(statusCodes.OK).json({ token });
    // .redirect('/matches');
  }

  static getRole(req: IReq, res: Response): void {
    const { user } = req;
    if (!user) throw new Unauthorized('Token not found');
    res.status(statusCodes.OK).json({ role: user.role });
  }
}
