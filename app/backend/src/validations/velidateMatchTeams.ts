import { IMatchTeams, ITeamService } from '../interfaces';
import TeamService from '../services/TeamService';

class ValidateMatchTeams {
  private teamService: ITeamService;
  constructor(private _matchTeams: IMatchTeams) {
    this.teamService = new TeamService();
  }

  IsSameTeams(): boolean {
    const { homeTeamId, awayTeamId } = this._matchTeams;
    return homeTeamId === awayTeamId;
  }

  async ExistTeams(): Promise<boolean> {
    const { homeTeamId, awayTeamId } = this._matchTeams;
    const homeTeam = await this.teamService.getById(String(homeTeamId));
    const awayTeam = await this.teamService.getById(String(awayTeamId));
    if (homeTeam && awayTeam) return true;
    return false;
  }
}

export default ValidateMatchTeams;
