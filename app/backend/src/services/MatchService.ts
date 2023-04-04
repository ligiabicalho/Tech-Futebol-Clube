import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
// import { IMatch } from '../interfaces/IMatch';

export default class MatchService {
  private _matchModel: ModelStatic<Match>;
  constructor() {
    this._matchModel = Match;
  }

  async getAll(inProgress: string | undefined): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      // where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    const inProgressBoolean = (inProgress === 'true');
    console.log('inProgressBoolean', inProgressBoolean);
    if (inProgress) {
      return matches.filter((match) => match.inProgress === inProgressBoolean);
    }
    return matches;
  }
}
