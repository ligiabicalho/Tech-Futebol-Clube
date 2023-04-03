import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare readonly id: number;
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

export default Team;
