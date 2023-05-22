// Nome do Cargo(role), descricao do cargo
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
