require('dotenv').config();

module.exports = {
  development: {
    username: process.env.AuthDB_USER_NAME,
    password: process.env.AuthDB_USER_PW,
    database: process.env.AuthDB_DATABASE,
    host: process.env.AuthDB_HOST,
    port: process.env.AuthDB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
    username: process.env.AuthDB_USER_NAME,
    password: process.env.AuthDB_USER_PW,
    database: process.env.AuthDB_DATABASE,
    host: process.env.AuthDB_HOST,
    port: process.env.AuthDB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    username: process.env.AuthDB_USER_NAME,
    password: process.env.AuthDB_USER_PW,
    database: process.env.AuthDB_DATABASE,
    host: process.env.AuthDB_HOST,
    port: process.env.AuthDB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
