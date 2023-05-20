const jwt = require('jsonwebtoken');
const User = require('../models/User');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];


async function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  console.log(req)
  if (!authHeader) {
    return res.status(401).json('Acesso negado. Token não fornecido.');
  }
  console.log(authHeader)
  
  try {
    const decoded = jwt.verify(authHeader, config.secret);
    const user = await User.where({ _id: decoded._id }).findOne();
    console.log(decoded)
    if (!user) {
      throw new Error();
    }
    req.user = user;

    req.token = decoded;
    next();
  }  catch (error) {
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Sua sessão expirou. Por favor, faça login novamente.' });
    }
    // let decoded = jwt.verify(authHeader, config.secret);
    // console.log(authHeader)
    // console.log(User.findOne({ where: { _id: decoded.id } }))
    res.status(401).json({ error: 'Sem autorização' });
  }
}

module.exports = authMiddleware;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY5MDlkMTgzZDg0ZDRkMmE2NjgwOWEiLCJpYXQiOjE2ODQ2MTM3ODUsImV4cCI6MTY4NDYxNzM4NX0.WnpxMAplnP7Z2mHkwuY99vZ7_qAy81srDhghYARiKlU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY5MDlkMTgzZDg0ZDRkMmE2NjgwOWEiLCJpYXQiOjE2ODQ2MTM3ODUsImV4cCI6MTY4NDYxNzM4NX0.WnpxMAplnP7Z2mHkwuY99vZ7_qAy81srDhghYARiKlU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY5MDlkMTgzZDg0ZDRkMmE2NjgwOWEiLCJpYXQiOjE2ODQ2MTM1NTAsImV4cCI6MTY4NDYxNzE1MH0.b--EylnWsJ_Puw3hZQZmgT2FBCZhOJjG6H4NTneQuGE

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY5MDlkMTgzZDg0ZDRkMmE2NjgwOWEiLCJpYXQiOjE2ODQ2MTM3ODUsImV4cCI6MTY4NDYxNzM4NX0.WnpxMAplnP7Z2mHkwuY99vZ7_qAy81srDhghYARiKlU