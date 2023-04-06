import { Request, Response } from 'express';
import statusCodes from '../utils/statusCode';
import { LeaderBoardService } from '../services';

export default class LeaderBoardController {
  constructor(private _service: LeaderBoardService = new LeaderBoardService()) {
  }

  async getLeaderBoard(req: Request, res: Response): Promise<void> {
    const { path } = req;
    console.log(path, typeof path);
    const leaderBoard = await this._service.getLeaderBoard(path);
    res.status(statusCodes.OK).json(leaderBoard);
  }
}
