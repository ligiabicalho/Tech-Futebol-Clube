import Team from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeams';

// class Model no sequelize possui métodos estáticos: findAll, findByPk,
// Para instanciá-la deve tipar com ModelStatic ou simplesmente chamá-la em um método tb estático.
// Contribuições para discussão deste assunto dos colegas: Malu Suhadolnik, Breno Lavalle Garrido.
// ref: https://sequelize.org/docs/v6/other-topics/typescript/#requesting-a-model-class
// https://sequelize.org/api/v6/class/src/model.js~model

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }

  static async getById(id: string): Promise<ITeam | null> {
    const team = await Team.findByPk(id);
    return team;
  }
}
