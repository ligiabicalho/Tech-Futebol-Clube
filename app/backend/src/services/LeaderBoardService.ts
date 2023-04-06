import { QueryTypes, Sequelize } from 'sequelize';
import db from '../database/models';
import { ILeaderBoard } from '../interfaces';
import getQuery, { ITypePath } from '../utils/queryLeaderBoard';
// import queryLeaderBoard from '../utils/queryLeaderBoard';

export default class LeaderBoardService {
  readonly home: ITypePath;
  readonly away: ITypePath;
  constructor(
    private _db: Sequelize = db,
  ) {
    this.home = {
      p1goals: 'home_team_goals',
      p1Id: 'home_team_id',
      tableP1Id: 'm.home_team_id',
      p2goals: 'away_team_goals',
      progress: false,
    };
    this.away = {
      p1goals: 'away_team_goals',
      p1Id: 'away_team_id',
      tableP1Id: 'm.away_team_id',
      p2goals: 'home_team_goals',
      progress: false,
    };
  }

  public async getLeaderBoard(path: string): Promise<ILeaderBoard[]> {
    let typePath: ITypePath;
    if (path === '/home') {
      typePath = this.home;
    } else typePath = this.away;

    const leaderBoard = await this._db.query(
      `${getQuery(typePath)}`,
      { type: QueryTypes.SELECT },
    );
    return leaderBoard as ILeaderBoard[];
  }
}
