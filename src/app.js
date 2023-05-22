const express = require('express');
const User = require('./model/user');
require('dotenv').config();

// Conexao com o Banco de dados
const connectDB = require('./config/database');
connectDB();

const app = express();
app.use(express.json());

// somente iniciar os servicos ser conectar ao banco
connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});