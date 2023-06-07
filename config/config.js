const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});

module.exports = {
  development: {
    secret: process.env.JWT_SECRET,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    access: process.env.ACCESS_TOKEN,
    mercadopago: {
      access_token: process.env.PAYMENT_TOKEN,
      integrator_id: process.env.PAYMENT_KEY
    },
    dialect: 'mysql',
  },
  test: {
    secret: process.env.JWT_SECRET,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    access: process.env.ACCESS_TOKEN,
    mercadopago: {
      access_token: process.env.PAYMENT_TOKEN,
      integrator_id: process.env.PAYMENT_KEY
    },
    dialect: 'mysql',
  },
  production: {
    secret: process.env.JWT_SECRET,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    access: process.env.ACCESS_TOKEN,
    dialect: 'mysql',
    mercadopago: {
      access_token: process.env.PAYMENT_TOKEN,
      integrator_id: process.env.PAYMENT_KEY
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
