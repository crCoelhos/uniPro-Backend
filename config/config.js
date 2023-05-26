const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});

module.exports = {
  development: {
    secret: process.env.JWT_SECRET,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  test: {
    secret: process.env.JWT_SECRET,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    secret: process.env.JWT_SECRET,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
