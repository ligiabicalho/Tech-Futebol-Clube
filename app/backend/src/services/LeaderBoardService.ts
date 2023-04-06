import { QueryTypes, Sequelize } from 'sequelize';
import db from '../database/models';
import { ILeaderBoard } from '../interfaces';
import queryLeaderBoard from '../utils/queryLeaderBoard';

export default class LeaderBoardService {
  constructor(
    private _db: Sequelize = db,
  ) {
  }

  public async getLeaderBoard(): Promise<ILeaderBoard[]> {
    return this._db.query(
      `${queryLeaderBoard}`,
      { type: QueryTypes.SELECT },
    );
  }
}
