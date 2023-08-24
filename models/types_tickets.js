'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Types_tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Types_tickets.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    qt_modalities: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
  }, 
  {
    sequelize,
    modelName: 'Types_ticket',
    tableName: 'Types_tickets',
  });
  return Types_tickets;
};