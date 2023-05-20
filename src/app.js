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
// app.post("/user",async (req, res) => {
//     try {
//         // Verifica se o usuário logado possui a role "admin"
//         //   if (!req.body.isAdmin) {
//         //     return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
//         //   }
//         const { name, CPF, email, contact, isAdmin, password } = req.body;
//         console.log(req.body)

//         // Criptografa a senha
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({ name, CPF, email, contact, isAdmin, password: hashedPassword });
//         res.status(201).json(user);
//     } catch (err) {
//         console.log(req.body.isAdmin)

//         res.status(500).json({ message: err.message });
//     }
// })

// Configuração das rotas
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
// app.use('/admin', adminRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`); 
});
