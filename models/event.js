'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ticket,{
        as: 'ticket',
        foreignKey:'eventId'
      })
      this.hasMany(models.Category,{
        as: 'category',
        foreignKey:'eventId'
      })
    }
  }

  Event.init(
    {
      name: {
        type:DataTypes.STRING,
        allowNull:false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      policy:{
        type:DataTypes.TEXT,
        allowNull:false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bannerEvent:{
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'Events',
    }
  );

  return Event;
};