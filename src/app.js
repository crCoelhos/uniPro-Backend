const connectDB = require('./config/database');
connectDB();
const express = require('express');
// const User = require('./models/User');
// const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa as rotas
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

// Configuração do Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração das rotas
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
// app.use('/admin', adminRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); 
});
