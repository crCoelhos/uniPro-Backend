'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    date: {
      type:DataTypes.DATE,
      allowNull:false
    },
    location: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};