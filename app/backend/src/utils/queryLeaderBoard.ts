const queryLeaderBoard = `SELECT t.team_name as name,
    SUM(((home_team_goals > away_team_goals)*3) +
      ((home_team_goals = away_team_goals)*1)) as totalPoints,
    SUM((home_team_goals > away_team_goals) +
      (home_team_goals = away_team_goals) +
      (home_team_goals < away_team_goals)) as totalGames,
    SUM((home_team_goals > away_team_goals)) as totalVictories,
    SUM((home_team_goals = away_team_goals)) as totalDraws,
    SUM((home_team_goals < away_team_goals)) as totalLosses,
    SUM(home_team_goals) as goalsFavor,
    SUM(away_team_goals) as goalsOwn
  FROM matches as m
  JOIN teams as t ON t.id = m.home_team_id
  WHERE m.in_progress = ?
  GROUP BY m.home_team_id;`;

export default queryLeaderBoard;
