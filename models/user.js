'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'roleId',
      });
      this.belongsToMany(models.Ticket,{
        through:'User_tickets',
        as: 'ticket',
        foreignKey:'userId',
        otherKey: 'ticketId'
      })
      this.belongsToMany(models.Athletic,{
        through:'User_athletics',
        as: 'athletic',
        foreignKey:'userId',
        otherKey: 'athleticId'
      })
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sex: {
        type: DataTypes.ENUM("F","M"),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      photo:{
        type: DataTypes.STRING,
        allowNull: true
      },
      document:{
        type: DataTypes.STRING,
        allowNull: true
      },
      registration:{
        type: DataTypes.STRING,
        allowNull: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );

  return User;
};
