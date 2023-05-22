// Nome, Email, Senha, Telefone, CPF, Cargo (Novo Model?), nascimento
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
