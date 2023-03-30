import { Model, INTEGER, STRING } from 'sequelize';
// import ITeam from 'src/interfaces/ITeams';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  modelName: 'team', // ou apenas tableName?? -> doc sequelize! (https://sequelize.org/docs/v6/other-topics/typescript/)
  tableName: 'teams',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Team, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Team, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Team.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Team.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
