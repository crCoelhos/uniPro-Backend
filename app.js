const cors = require('cors')
const express = require('express');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const authRoute = require('./routes/authRoutes.js')
const userRoute = require('./routes/userRoutes.js')
const roleRoute = require('./routes/roleRoutes.js')
const eventController = require('./routes/eventRoutes.js')
app.use("/auth", authRoute);
app.use("/admin", userRoute);
app.use("/admin", roleRoute);
app.use("/admin", eventController);

// somente iniciar os servicos ser conectar ao banco
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
