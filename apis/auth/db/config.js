require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PW,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PW,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    username: process.env.PRODUCT_DB_USER,
    password: process.env.PRODUCT_DB_PW,
    database: process.env.PRODUCT_DB_NAME,
    host: process.env.PRODUCT_DB_HOST,
    port: process.env.PRODUCT_DB_PORT,
    dialect: 'mysql',
    operatorsAliases: false,
  },
};
