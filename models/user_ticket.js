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
      this.belongsTo(models.User_athletic,{
        as: 'userAt',
        foreignKey: 'userId',
        targetKey:'userId'
      })
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
    athleticId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Athletics',
        key: 'id'
      },
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    },
    ticketId: {
      type: DataTypes.UUID,
      references: {
        model: 'Tickets',
        key: 'id'
      },
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      },
      allowNull: false
    },
    athleticId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Athletics',
        key: 'id'
      },
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM('processando', 'aguardando', 'confirmado', 'cancelado', 'expirado'),
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'User_ticket',
    tableName: 'User_tickets',
  });
  return User_ticket;
};