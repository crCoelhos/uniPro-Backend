// Objectid ligado ao User, Objectid ligado ao cargo(role)
const mongoose = require('mongoose');

const userRolesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
});

const UserRoles = mongoose.model('UserRoles', userRolesSchema);

module.exports = UserRoles;
