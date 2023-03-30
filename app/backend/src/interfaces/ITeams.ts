export interface ITeam {
  id: number;
  teamName: string
}

export interface IServiceTeam {
  getAll(): ITeam[];
}
