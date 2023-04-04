import { Request, Response } from 'express';
import NotFound from '../errors/NotFound';
import statusCodes from '../utils/statusCode';
import { TeamService } from '../services';

export default class TeamController {
  private _service: TeamService;
  constructor() {
    this._service = new TeamService();
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const teams = await this._service.getAll();
    res.status(statusCodes.OK).json(teams);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await this._service.getById(id);
    if (!team) throw new NotFound('Team does not exist in database!');
    res.status(statusCodes.OK).json(team);
  }
}
