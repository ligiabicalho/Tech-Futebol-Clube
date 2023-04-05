export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatch extends IGoals {
  id: number
  homeTeamId: number,
  awayTeamId: number,
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
