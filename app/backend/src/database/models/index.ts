import { Sequelize, QueryTypes } from 'sequelize';
import * as config from '../config/database';

const sequelize = new Sequelize(config)

export default sequelize;

// index da Model Sequelize TS é mais simple mesmo!