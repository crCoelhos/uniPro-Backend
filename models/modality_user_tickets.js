'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modality_user_tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Modality_user_tickets.init({
    modalityId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    user_ticketId: {
      type: DataTypes.UUID,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Modality_user_tickets',
  });
  return Modality_user_tickets;
};