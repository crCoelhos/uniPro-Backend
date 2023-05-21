const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User.js");


const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // const user = await User.findone({
      const user = await User.where({ email:email}).findOne();
    if (!user) {
      return res.status(400).json({ error: 'Usuario ou senha invalida' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Usuario ou senha invalida' });
    }

    const token = jwt.sign({ _id: user.id }, config.secret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor, contate o suporte' });
  }
}

async function protected(req, res) {
  try {
    res.json({ message: `Bem-vindo de volta, ${req.user.name}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor, contate o suporte' });
  }
}


module.exports = {
  login,
  protected,
};