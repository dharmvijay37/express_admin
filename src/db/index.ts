import {Sequelize} from 'sequelize'

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db')[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
