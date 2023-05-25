'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "UserRole",
        as:"role",
        foreignKey:"userId",
        onDelete: 'CASCADE'
      })
    }
  }
  
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    contact: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    cpf: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true 
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'

  });
  return User;
};