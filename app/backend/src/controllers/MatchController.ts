import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { MatchService } from '../services';
import BadRequest from '../errors/BadRequest';
import { IGoals, IMatchCreate } from '../interfaces';

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

  async updateGoals(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { body } = req;
    const update = await this._service.updateGoals(id as string, body as IGoals);
    if (!update) throw new BadRequest('Gols não atualizados.');

    res.status(statusCodes.OK).json({ message: 'Goal!' });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const newMatch = await this._service.create(body);
    if (!newMatch) throw new BadRequest('Erro ao criar nova partida');

    res.status(statusCodes.CREATED).json(newMatch);
  }
}
