const cors = require('cors')
const express = require('express');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());


const authRoute = require('./routes/authRoutes.js')
const userRoute = require('./routes/userRoutes.js')
const roleRoute = require('./routes/roleRoutes.js')
const eventRoute = require('./routes/eventRoutes.js')
const lotRoute = require('./routes/lotRoutes.js')
const ticketRoute = require('./routes/ticketRoutes.js')
app.use("/auth", authRoute);
app.use("/admin", userRoute);
app.use("/admin", roleRoute);
app.use("/admin", eventRoute);
app.use("/admin", lotRoute);
app.use("/admin", ticketRoute);

// somente iniciar os servicos ser conectar ao banco
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
