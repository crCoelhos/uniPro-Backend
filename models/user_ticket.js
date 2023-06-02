'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.User,{
      //   as: 'user',
      //   foreignKey: 'userId'
      // })
      this.belongsTo(models.Ticket,{
        as: 'ticket',
        foreignKey: 'ticketId'
      })
      this.belongsTo(models.User,{
        as: 'user',
        foreignKey: 'userId'
      })
    }
  }
  User_ticket.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    ticketId: {
      unique:true,
      type: DataTypes.UUID,
      references: {
        model: 'tickets',
        key: 'id'
      },
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM('cancelado', 'confirmado','processando', 'aguardando', 'expirado'),
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'User_ticket',
    tableName: 'User_tickets',
  });
  return User_ticket;
};