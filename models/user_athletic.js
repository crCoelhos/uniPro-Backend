'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_athletic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      })
      this.belongsTo(models.Athletic, {
        as: "athletic",
        foreignKey: "athleticId",
      })
    }
  }
  User_athletic.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    athleticId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Athletics',
        key: 'id'
      }
    },
    accepted:{
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    isInterested:{
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'User_athletic',
    tableName: 'User_athletics',
  });
  return User_athletic;
};