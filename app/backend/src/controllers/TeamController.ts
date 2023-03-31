import { Request, Response } from 'express';
import NotFound from '../errors/NotFound';
import statusCodes from '../utils/statusCode';
import { TeamService } from '../services';

export default class TeamController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    const teams = await TeamService.getAll();
    res.status(statusCodes.OK).json(teams);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await TeamService.getById(id);
    if (!team) throw new NotFound('Team does not exist in database!');
    res.status(statusCodes.OK).json(team);
  }
}
