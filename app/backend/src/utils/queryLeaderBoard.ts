interface ITypePath {
  p1goals: string,
  p1Id: string,
  tableP1Id: string,
  p2goals: string,
  progress: boolean,
}
// o uso de tamplete literals não é um problmea de segurança neste caso.
// as variáveis já são pré-definidas, dependendo do path.
// não são dados enviados pelo usuário!

const getQuery = (typePath: ITypePath): string => {
  const { p1goals, p1Id, tableP1Id, p2goals, progress } = typePath;
  return `SELECT t.team_name AS name,
    SUM(((${p1goals} > ${p2goals})*3) + 
      ((${p1goals} = ${p2goals})*1)) AS totalPoints,
    COUNT(${p1Id}) AS totalGames,
    SUM((${p1goals} > ${p2goals})) AS totalVictories,
    SUM((${p1goals} = ${p2goals})) AS totalDraws,
    SUM((${p1goals} < ${p2goals})) AS totalLosses,
    SUM(${p1goals}) AS goalsFavor,
    SUM(${p2goals}) AS goalsOwn,
    SUM(${p1goals} - ${p2goals}) AS goalsBalance,
    round((SUM(((${p1goals} > ${p2goals})*3) + 
      ((${p1goals} = ${p2goals})*1)) / 
      (COUNT(${p1Id})*3) * 100), 2) AS efficiency
    FROM matches AS m JOIN teams AS t ON t.id = ${tableP1Id}
    WHERE m.in_progress = ${progress} GROUP BY ${tableP1Id}
    ORDER BY totalPoints DESC, totalVictories DESC, 
      goalsBalance DESC, goalsFavor DESC;`;
};

const queryGeral = `SELECT 
  t.team_name AS name,
  SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3 
           WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
           WHEN m.home_team_goals = m.away_team_goals THEN 1
           ELSE 0 END) AS totalPoints,
  COUNT(*) AS totalGames,
  SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 1 
           WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 1 
           ELSE 0 END) AS totalVictories,
  SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
  SUM(CASE WHEN m.home_team_id = t.id AND m.home_team_goals < m.away_team_goals THEN 1 
           WHEN m.away_team_id = t.id AND m.away_team_goals < m.home_team_goals THEN 1 
           ELSE 0 END) AS totalLosses,
  SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals 
           WHEN m.away_team_id = t.id THEN m.away_team_goals
           ELSE 0 END) AS goalsFavor,
  SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals 
           WHEN m.away_team_id = t.id THEN m.home_team_goals
           ELSE 0 END) AS goalsOwn,
  SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals - m.away_team_goals
           WHEN m.away_team_id = t.id THEN m.away_team_goals - m.home_team_goals
           ELSE 0 END) AS goalsBalance,
 round((SUM(
    CASE
      WHEN m.home_team_id = t.id AND m.home_team_goals > m.away_team_goals THEN 3
      WHEN m.away_team_id = t.id AND m.away_team_goals > m.home_team_goals THEN 3
      WHEN m.home_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
      WHEN m.away_team_id = t.id AND m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) / (COUNT(
    CASE
      WHEN m.home_team_id = t.id OR m.away_team_id = t.id THEN 1
    END
  ) * 3) * 100),2) AS efficiency
FROM matches as m
INNER JOIN teams as t ON t.id = m.home_team_id OR t.id = m.away_team_id
WHERE m.in_progress = false
GROUP BY t.id   
ORDER BY totalPoints DESC, totalVictories DESC, 
      goalsBalance DESC, goalsFavor DESC`;

export { getQuery, queryGeral, ITypePath };
