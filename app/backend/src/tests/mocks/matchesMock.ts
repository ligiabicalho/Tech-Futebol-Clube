import { MatchRes, IMatchCreate, IGoals } from "../../interfaces/IMatch";
import Match from '../../database/models/MatchModel';

const allMatches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
  {
    "id": 2,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
  }
] as Match[]

const MatchCreate = {
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
} as IMatchCreate

const MatchUpGoals = {
    "homeTeamGoals": 2,
    "awayTeamGoals": 0,
} as IGoals

const MatchCreateSameTeams = {
    "homeTeamId": 5,
    "homeTeamGoals": 2,
    "awayTeamId": 5,
    "awayTeamGoals": 0,
} as IMatchCreate

const MatchCreateTeamsNotExist = {
    "homeTeamId": 55,
    "homeTeamGoals": 2,
    "awayTeamId": 99,
    "awayTeamGoals": 0,
} as IMatchCreate

const MatchesRes = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
] as MatchRes[]

export { allMatches, MatchesRes, MatchCreate, MatchUpGoals,
  MatchCreateSameTeams, MatchCreateTeamsNotExist }; 