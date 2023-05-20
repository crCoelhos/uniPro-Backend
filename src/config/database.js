// Importacao Mongoose (ORM ODM)
const mongoose = require('mongoose');
require('dotenv').config();

// logica para a Conexao
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    // funcao para mostrar o erro console
    console.error('Erro ao se conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
