const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());


const authRoute = require('./routes/authRoutes.js')
const userRoute = require('./routes/userRoutes.js')
app.use("/auth", authRoute);
app.use("/user", userRoute);

// somente iniciar os servicos ser conectar ao banco
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
