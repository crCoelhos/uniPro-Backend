'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transations.init({
    transationId:{
      type: DataTypes.BIGINT(12),
      allowNull: false,
    },
    user_ticketId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User_tickets',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Transations',
    tableName: 'Transations',
  });
  return Transations;
};