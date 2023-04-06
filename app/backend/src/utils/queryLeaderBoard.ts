export interface ITypePath {
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
  return `SELECT t.team_name as name,
    SUM(((${p1goals} > ${p2goals})*3) + 
      ((${p1goals} = ${p2goals})*1)) as totalPoints,
    COUNT(${p1Id}) as totalGames,
    SUM((${p1goals} > ${p2goals})) as totalVictories,
    SUM((${p1goals} = ${p2goals})) as totalDraws,
    SUM((${p1goals} < ${p2goals})) as totalLosses,
    SUM(${p1goals}) as goalsFavor,
    SUM(${p2goals}) as goalsOwn,
    SUM(${p1goals} - ${p2goals}) as goalsBalance,
    round((SUM(((${p1goals} > ${p2goals})*3) + 
      ((${p1goals} = ${p2goals})*1)) / 
      (COUNT(${p1Id})*3) * 100), 2) as efficiency
    FROM matches as m JOIN teams as t ON t.id = ${tableP1Id}
    WHERE m.in_progress = ${progress} GROUP BY ${tableP1Id}
    ORDER BY totalPoints DESC, totalVictories DESC, 
      goalsBalance DESC, goalsFavor DESC;`;
};

export default getQuery;
