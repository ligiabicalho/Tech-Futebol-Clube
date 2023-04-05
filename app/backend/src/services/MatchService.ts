import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { IGoals, IMatch } from '../interfaces';

export default class MatchService {
  constructor(private _matchModel: ModelStatic<Match> = Match) {
  }

  async getAll(inProgress: string | undefined): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    const inProgressBoolean = (inProgress === 'true');
    if (inProgress) {
      return matches.filter((match) => match.inProgress === inProgressBoolean);
    }
    return matches;
  }

  async updateProgress(id: string): Promise<IMatch | number> {
    const [updateMatch] = await this._matchModel.update(
      { inProgress: 0 },
      { where: { id } },
    );
    return updateMatch;
  }
}
