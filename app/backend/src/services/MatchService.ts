import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { IGoals, IMatch, IMatchCreate } from '../interfaces';

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

  async updateProgress(id: string): Promise<number> {
    const [updateMatch] = await this._matchModel.update(
      { inProgress: 0 },
      { where: { id } },
    );
    return updateMatch;
  }

  async updateGoals(id: string, goals: IGoals): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = goals;
    const [updateGoals] = await this._matchModel.update(
      { homeTeamGoals,
        awayTeamGoals,
      },
      { where: {
        id,
        inProgress: 1,
      } },
    );
    return updateGoals;
  }

  async create(match: IMatchCreate): Promise<IMatch> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;

    const newMatch = await this._matchModel.create(
      { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true },
    );
    return newMatch;
  }
}
