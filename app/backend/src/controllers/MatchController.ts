import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { MatchService } from '../services';

export default class MatchController {
  private _service: MatchService;
  constructor(service: MatchService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = await this._service.getAll(inProgress as string | undefined);
    res.status(statusCodes.OK).json(matches);
  }
}
