import Match from '../database/models/MatchModel';

export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchTeams {
  homeTeamId: number,
  awayTeamId: number,
}

export interface IMatchCreate extends IGoals, IMatchTeams {
}

export interface IMatch extends IGoals, IMatchCreate {
  id: number
  inProgress: boolean,
}

export interface MatchRes extends Match {
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}

export interface IValidateMatchTeams{
  IsSameTeams(): boolean,
  ExistTeams(): Promise<boolean>
}
