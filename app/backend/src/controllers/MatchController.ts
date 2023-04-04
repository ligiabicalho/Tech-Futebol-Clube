import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { MatchService } from '../services';

export default class MatchController {
  private _service: MatchService;
  constructor(service: MatchService) {
    this._service = service;
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const matches = await this._service.getAll();
    res.status(statusCodes.OK).json(matches);
  }
}
