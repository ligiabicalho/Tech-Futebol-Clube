import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private _service: LeaderBoardService = new LeaderBoardService()) {
  }

  async getLeaderBoard(req: Request, res: Response): Promise<void> {
    const { path } = req;

    const leaderBoard = await this._service.getLeaderBoard(path);
    res.status(statusCodes.OK).json(leaderBoard);
  }

  async getLeaderBoardGeral(_req: Request, res: Response): Promise<void> {
    const leaderBoardGeral = await this._service.getLeaderBoardGeral();
    res.status(statusCodes.OK).json(leaderBoardGeral);
  }
}
