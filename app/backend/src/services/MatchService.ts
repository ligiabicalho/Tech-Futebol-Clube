import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { IMatch } from '../interfaces/IMatch';

export default class MatchService {
  private _matchModel: ModelStatic<Match>;
  constructor() {
    this._matchModel = Match;
  }

  async getAll(): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
