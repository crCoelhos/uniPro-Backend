'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Athletic extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.User,{
        through:'user_athletics',
        as: 'user',
        foreignKey:'athleticId',
        otherKey: 'userId'
      })
    }
  }
  Athletic.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      college_course: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      direction: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Athletic',
      tableName: 'Athletics',
    }
  );
  return Athletic;
};
