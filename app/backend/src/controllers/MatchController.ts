import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { MatchService } from '../services';
import { Unprocessable, NotFound, BadRequest } from '../errors';
import ValidateMatchTeams from '../validations/velidateMatchTeams';
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

  async updateGoals(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { body } = req;
    const update = await this._service.updateGoals(id as string, body as IGoals);
    if (!update) throw new BadRequest('Gols não atualizados.');

    res.status(statusCodes.OK).json({ message: 'Updated match!' });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { homeTeamId, awayTeamId } = req.body;
    const validateMatchTeams = new ValidateMatchTeams({ homeTeamId, awayTeamId });

    if (validateMatchTeams.IsSameTeams()) {
      throw new Unprocessable('It is not possible to create a match with two equal teams');
    }

    const existTeams = await validateMatchTeams.ExistTeams();
    if (!existTeams) {
      throw new NotFound('There is no team with such id!');
    }

    const newMatch = await this._service.create(req.body);
    if (!newMatch) throw new BadRequest('Erro ao criar nova partida');

    res.status(statusCodes.CREATED).json(newMatch);
  }
}
