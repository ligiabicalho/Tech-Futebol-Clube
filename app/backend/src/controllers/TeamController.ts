import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import TeamService from '../services';
import 'express-async-errors';

export default class TeamController {
  static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const Teams = await TeamService.getAll();
      res.status(statusCodes.ok).json(Teams);
    } catch (error) {
      next(error);
    }
  }
}
