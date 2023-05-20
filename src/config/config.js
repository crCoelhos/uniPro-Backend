require('dotenv').config();

module.exports = {
  development: {
    secret: process.env.SECRET,
  },
  test: {
    secret: process.env.SECRET,
  },
  production: {
    secret: process.env.SECRET,
  },
};
