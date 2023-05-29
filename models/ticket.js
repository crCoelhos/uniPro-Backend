const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.Lot, {
        foreignKey: 'lotId',
        as: 'lot',
      });
      this.belongsToMany(models.User,{
        through:'user_tickets',
        as: 'user',
        foreignKey:'ticketId', 
        otherKey: 'userId'
      })
      this.hasMany(models.User_ticket,{
        foreignKey:'ticketId',
        as:'User_ticket'
      })
    }
  }

  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      sold:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      inProcessing:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      lotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'lots',
          key: 'id'
        }
      },
    },
    {
      sequelize,
      modelName: 'Ticket',
      tableName: 'Tickets',
    }
  );

  return Ticket;
};
