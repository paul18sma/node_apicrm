import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize(
    'node_api_auth_db',
    'node_user', 
    'node.uaa_1', {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  });