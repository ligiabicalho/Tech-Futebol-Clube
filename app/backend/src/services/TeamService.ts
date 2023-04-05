import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';

// class Model no sequelize possui métodos estáticos: findAll, findByPk,
// Para instanciá-la deve tipar com ModelStatic ou simplesmente chamá-la em um método tb estático.
// Contribuições para discussão deste assunto dos colegas: Malu Suhadolnik, Breno Lavalle Garrido.
// ref: https://sequelize.org/docs/v6/other-topics/typescript/#requesting-a-model-class
// https://sequelize.org/api/v6/class/src/model.js~model

export default class TeamService {
  constructor(private _teamModel: ModelStatic<Team> = Team) {
  }

  async getAll(): Promise<ITeam[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  async getById(id: string): Promise<ITeam | null> {
    const team = await this._teamModel.findByPk(id);
    return team;
  }
}
