const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User')
// const User = mongoose.model('User', userSchema);

async function signup(req, res) {
  try {
    // nome, email, senha, telefone, cpf, data de nascimento
    const { name, email, password, contact, cpf, birthdate } = req.body;

    const [existingEmail, existingContact, existingCpf] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ contact }),
      User.findOne({ cpf }),
    ]);

    if (existingEmail) {
      return res.status(409).json({ message: 'E-mail já está em uso' });
    }

    if (existingContact) {
      return res.status(409).json({ message: 'Contato já está em uso' });
    }

    if (existingCpf) {
      return res.status(409).json({ message: 'CPF já está em uso' });
    }

    // Criacao do usuario com a senha criptografada
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contact,
      cpf,
      birthdate,
    });

    await newUser.save();

    res.status(201).json({ message: 'Conta criada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar a conta' });
  }
}


async function login(req, res) {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: login },
        { contact: login }
      ]
    });

    if (!user) {
      return res.status(400).json({ error: 'Usuário ou senha inválida' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Usuário ou senha inválida' });
    }

    // Crie e retorne um token de acesso
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}



module.exports = {
  login,
  signup
};