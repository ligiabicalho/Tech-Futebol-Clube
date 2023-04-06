const queryLeaderBoard = `
  SELECT t.team_name as name,
    SUM(((home_team_goals > away_team_goals)*3) + 
      ((home_team_goals = away_team_goals)*1)) as totalPoints,
    COUNT(home_team_id) as totalGames,
    SUM((home_team_goals > away_team_goals)) as totalVictories,
    SUM((home_team_goals = away_team_goals)) as totalDraws,
    SUM((home_team_goals < away_team_goals)) as totalLosses,
    SUM(home_team_goals) as goalsFavor,
    SUM(away_team_goals) as goalsOwn,
    SUM(home_team_goals - away_team_goals) as goalsBalance,
    round((SUM(((home_team_goals > away_team_goals)*3) + 
      ((home_team_goals = away_team_goals)*1)) / 
      (COUNT(home_team_id) * 3) * 100), 2) as efficiency
  FROM matches as m
  JOIN teams as t ON t.id = m.home_team_id
  WHERE m.in_progress = false
  GROUP BY m.home_team_id
  ORDER BY totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC;`;

export default queryLeaderBoard;
