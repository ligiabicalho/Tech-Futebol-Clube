import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private _service: LeaderBoardService = new LeaderBoardService()) {
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const leaderBoard = await this._service.getLeaderBoard();
    res.status(statusCodes.OK).json(leaderBoard);
  }
}
