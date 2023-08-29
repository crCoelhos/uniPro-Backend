'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transation extends Model { 
    static associate(models) {
      // define association here
    }
  }
  Transation.init({
    transationId: {
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
    modelName: 'Transation',
    tableName: 'Transations',
  });
  return Transation;
};
