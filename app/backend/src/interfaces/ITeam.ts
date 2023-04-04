export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<ITeam[]>;
  getById(id: string): Promise<ITeam | null>;
}
// não é possível implementar se os métodos forem estático. Alterar.
