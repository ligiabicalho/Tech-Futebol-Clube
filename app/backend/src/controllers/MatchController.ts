import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { MatchService } from '../services';
import BadRequest from '../errors/BadRequest';
import { IGoals } from '../interfaces';

export default class MatchController {
  constructor(private _service: MatchService) {
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = await this._service.getAll(inProgress as string | undefined);
    res.status(statusCodes.OK).json(matches);
  }

  async updateProgress(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const update = await this._service.updateProgress(id as string);
    if (!update) throw new BadRequest('A partida já estava finalizada.');

    res.status(statusCodes.OK).json({ message: 'Finish!' });
  }
}
