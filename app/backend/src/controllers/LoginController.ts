import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { UserService } from '../services';

export default class LoginController {
  private _service: UserService;
  constructor() {
    this._service = new UserService();
  }

  async login(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const token = await this._service.login(body);

    if (!token) {
      throw new Error('Error token');
    }
    res.status(statusCodes.OK).json({ token });
    // .redirect('/matches');
  }
}
