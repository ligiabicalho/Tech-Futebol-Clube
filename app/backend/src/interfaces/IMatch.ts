export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchCreate extends IGoals {
  homeTeamId: number,
  awayTeamId: number,
}

export interface IMatch extends IGoals, IMatchCreate {
  id: number
  inProgress: boolean,
}

export interface MatchRes extends IMatch {
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}
